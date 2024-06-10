import { LitElement, html } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'


@customElement('bb-filter')
export class BbFilter extends LitElement {
    @state() openAddFilter= false;
    @state() openDropdown= false;
    @state() selectedRadioFilter= '';
    @state() selectedTitle= 'Person';
    @state() activeFilters: Array<{title: string, condition: string, value: string}> = [];
    @state() filterLinks: Array<string> = []; 
    @state() inputValue: string = '';

    
    createRenderRoot() {
        return this;
    }

    toggleFilter() {
        this.openAddFilter = !this.openAddFilter;
    }

    selectTitle(title: string) {
        this.selectedTitle = title;
    }

    selectRadioFilter(filterId: string) {
        this.selectedRadioFilter = filterId;
    }

    updateInput(event: Event) {
        const input = event.target as HTMLInputElement;
        this.inputValue = input.value;
    }
    
    addFilter(event: Event) {
        event.preventDefault(); // Prevent form submission
        if (this.inputValue.trim() !== '') {
            if (this.activeFilters.length > 0) {
                // Ajouter 'or' par défaut quand un nouveau filtre est ajouté
                this.filterLinks.push('or'); // ou 'and' selon votre logique
            }
            this.activeFilters.push({
                title: this.selectedTitle,
                condition: this.selectedRadioFilter,
                value: this.inputValue
            });
            this.inputValue = ''; // Clear input after adding
            this.toggleFilter(); // Optionally close the dropdown
        }
    }
    

    removeFilter(index: number) {
        this.activeFilters.splice(index, 1);
        this.requestUpdate(); // Trigger update to re-render the component
    }

    //basculer entre 'or' et 'and' pour chaque filtre
    toggleLink(index: number) {
        this.filterLinks[index] = this.filterLinks[index] === 'or' ? 'and' : 'or';
        this.requestUpdate(); // Pour mettre à jour le rendu
    }
    
    

    renderFilters() {
        return this.activeFilters.map((filter, index) => html`
            <div class="flex items-center mb-1 mr-0.5">
                <div class="bb-badge-filter">
                    ${filter.title} <span>${filter.condition}</span> ${filter.value}
                    <div class="-mr-2 bb-badge-filter__remove cursor-pointer hover:scale-125 ml-2" @click="${() => this.removeFilter(index)}">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </div>
                </div>
                ${index < this.activeFilters.length - 1 ? html`
                    <div class="inline-block relative cursor-pointer group px-2" @click="${() => this.toggleLink(index)}">
                        <span class="border-gray-600 group-hover:text-blueviolet-600 text-gray-600">${this.filterLinks[index]}</span>
                    </div>
                ` : ''}
            </div>
        `);
    }
    

    render () {
        return html`
        <div class="flex flex-wrap items-center">
            <!--la div ci dessous contient ce qui est lié au bouton add filter-->
            <div class="mb-1 order-1 relative" x-data="{ openAddFilter: false }">
                <button type="button" class="bb-btn-secondary" @click="${this.toggleFilter}">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 mr-1.5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4"></path></svg> 
                    Add filter
                </button>
                <!--la div ci dessous contient le menu déroulant-->
                <div
                    class="absolute bg-white focus:outline-none left-0 md:h-96 md:w-[32rem] mt-1 origin-top-left ring-1 ring-black ring-opacity-5 rounded-md shadow w-80 z-20"
                    x-transition:enter="transition ease-out origin-top-left duration-200"
                    x-transition:enter-start="opacity-0 transform scale-90"
                    x-transition:enter-end="opacity-100 transform scale-100"
                    x-transition:leave="transition origin-top-left ease-in duration-100"
                    x-transition:leave-start="opacity-100 transform scale-100"
                    x-transition:leave-end="opacity-0 transform scale-90"
                    style="display: ${this.openAddFilter ? 'block' : 'none'};"
                >
                    <!--la div ci dessous contient le titre du menu déroulant (person ou role)-->
                    <div class="h-full md:grid md:grid-cols-12 rounded-md text-sm">
                        <div class="bg-gray-50 col-span-4 md:rounded-l-md p-2 rounded-t-md">
                            <ul>
                            <li class="${this.selectedTitle === 'Person' ? 'bg-blueviolet-200/50' : ''} cursor-pointer flex items-center p-2 rounded-md" @click="${() => this.selectTitle('Person')}">
                                    <span> Person </span>
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 ml-auto w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"></path>
                                    </svg>
                                </li>
                                <li class="${this.selectedTitle === 'Role' ? 'bg-blueviolet-200/50' : ''} cursor-pointer flex items-center p-2 rounded-md" @click="${() => this.selectTitle('Role')}">
                                    <span> Role </span>
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 ml-auto w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"></path>
                                    </svg>
                                </li>
                            </ul>
                        </div>
                        <!--la div ci dessous contient le formulaire de filtre-->
                        <div class="bg-white col-span-8 md:rounded-r-md p-4 rounded-b-lg">
                            <form @submit="${this.addFilter}" class="flex flex-col h-full">
                                <fieldset>
                                    <div class="space-y-4">
                                        <div class="flex relative w-full">
                                            <div class="flex h-5 items-center"><input id="startswith" aria-describedby="large-description" name="filter" type="radio" class="bb-radio" @click="${() => this.selectRadioFilter('startswith')}" /></div>
                                            <div class="ml-3 text-sm">
                                                <label for="startswith" class="text-gray-700">starts with</label>
                                                <div><input @input="${this.updateInput}" name="startswith" type="${this.selectedRadioFilter === 'startswith' ? 'text' : 'hidden'}" class="bb-input" .value="${this.selectedRadioFilter === 'startswith' ? this.inputValue : ''}" /></div>
                                                </div>
                                        </div>
                                        <div class="flex relative w-full">
                                            <div class="flex h-5 items-center"><input id="endswith" aria-describedby="large-description" name="filter" type="radio" class="bb-radio" @click="${() => this.selectRadioFilter('endswith')}" /></div>
                                            <div class="ml-3 text-sm">
                                                <label for="endswith" class="text-gray-700">ends with</label>
                                                <div><input @input="${this.updateInput}" name="endswith" type="${this.selectedRadioFilter === 'endswith' ? 'text' : 'hidden'}" class="bb-input" .value="${this.selectedRadioFilter === 'startswith' ? this.inputValue : ''}" /></div>
                                                </div>
                                        </div>
                                        <div class="flex relative w-full">
                                            <div class="flex h-5 items-center"><input id="contains" aria-describedby="large-description" name="filter" type="radio" class="bb-radio" @click="${() => this.selectRadioFilter('contains')}" /></div>
                                            <div class="ml-3 text-sm">
                                                <label for="contains" class="text-gray-700">contains</label>
                                                <div><input @input="${this.updateInput}" name="contains" type="${this.selectedRadioFilter === 'contains' ? 'text' : 'hidden'}" class="bb-input" .value="${this.selectedRadioFilter === 'startswith' ? this.inputValue : ''}" /></div>
                                            </div>
                                        </div>
                                        <div class="flex relative w-full">
                                            <div class="flex h-5 items-center"><input id="notcontains" aria-describedby="large-description" name="filter" type="radio" class="bb-radio" @click="${() => this.selectRadioFilter('notcontains')}" /></div>
                                            <div class="ml-3 text-sm">
                                                <label for="notcontains" class="text-gray-700">does not contain</label>
                                                <div><input @input="${this.updateInput}" name="notcontains" type="${this.selectedRadioFilter === 'notcontains' ? 'text' : 'hidden'}" class="bb-input" .value="${this.selectedRadioFilter === 'startswith' ? this.inputValue : ''}" /></div>
                                                </div>
                                        </div>
                                    </div>
                                </fieldset>
                                <div class="mt-auto pt-8 text-center">
                                    <button type="button" class="bb-btn-link mr-2" @click="${this.toggleFilter}">Cancel</button> 
                                    <button type="submit" class="bb-btn-secondary">Add filter</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <!--la div ci dessous contient le bouton remove all-->
            
            <!--la div ci dessous contient l'affichage du filtre en lui même -->
            <div class="divide-x-3 lg:ml-6 lg:order-2 order-3 text-sm">
                ${this.renderFilters()}
            </div>
        </div>
    `
    }
}