import { LitElement, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';

interface Filter {
    key: string;
    condition: string;
    value: string;
    operator: string;
}

@customElement('bb-filter')
export class BbFilter extends LitElement {
    @state() openAddFilter: boolean = false;
    @state() selectedKey: string = 'Person';
    @state() selectedRadioFilter: string = '';
    @state() filterGroups: Filter[][] = [];
    @state() inputValue: string = '';
    @state() openDropdownIndex: number | null = null;

    createRenderRoot() {
        return this;
    }

    //affiche le menu général des filtres
    toggleFilter() {
        this.openAddFilter = !this.openAddFilter;
        this.requestUpdate();
    }

    //choisi la key (Person ou Role)
    selectKey(key: string) {
        this.selectedKey = key;
        this.requestUpdate();
    }

    //choisi le filtre (startswith, endswith, ...)
    selectRadioFilter(filterId: string) {
        this.selectedRadioFilter = filterId;
        this.requestUpdate();
    }

    //met à jour la valeur de l'input
    updateInput(event: Event) {
        const input = event.target as HTMLInputElement;
        this.inputValue = input.value;
        this.requestUpdate();
    }

    //ajout du filtre de l'utilisateur
    addFilter(event?: Event) {
        if (event) {
            event.preventDefault();
        }
        if (this.inputValue.trim() !== '') {
            let newOperator = 'and'; // Default operator

            // Set the operator based on the previous operator selected by the user
            if (this.filterGroups.length > 0) {
                const lastGroup = this.filterGroups[this.filterGroups.length - 1];
                if (lastGroup.length > 0) {
                    newOperator = lastGroup[lastGroup.length - 1].operator;
                }
            }

            const newFilter: Filter = {
                key: this.selectedKey,
                condition: this.selectedRadioFilter,
                value: this.inputValue,
                operator: newOperator
            };

            if (this.filterGroups.length === 0) {
                this.filterGroups.push([newFilter]);
            } else {
                const lastGroup = this.filterGroups[this.filterGroups.length - 1];
                const lastOperator = lastGroup[lastGroup.length - 1].operator;
                if (lastOperator === 'or') {
                    lastGroup.push(newFilter);
                } else {
                    this.filterGroups.push([newFilter]);
                }
            }

            this.inputValue = '';
            this.openAddFilter = false;
            this.requestUpdate();
            console.log('Filter groups after adding:', this.filterGroups);
        }
    }

    //c'est assez clair
    removeFilter(groupIndex: number, filterIndex: number) {
        this.filterGroups[groupIndex].splice(filterIndex, 1);
        if (this.filterGroups[groupIndex].length === 0) {
            this.filterGroups.splice(groupIndex, 1);
        }
        this.requestUpdate();
        console.log('Filter groups after removing:', this.filterGroups);
    }

    //pareil
    removeAllFilters() {
        this.filterGroups = [];
        this.requestUpdate();
        console.log('All filter groups removed.');
    }

    //affiche le dropdown 
    toggleDropdown(index: number) {
        this.openDropdownIndex = this.openDropdownIndex === index ? null : index;
        this.requestUpdate();
    }

    //choix de l'option du dropdown (or ou and)
    chooseOption(groupIndex: number, filterIndex: number, option: string) {
        this.filterGroups[groupIndex][filterIndex].operator = option;
        this.adjustFilterGroups();
        this.openDropdownIndex = null;
        this.requestUpdate();
    }

    //ajuste si le user change l'option du dropdown en cours de route
    adjustFilterGroups() {
        const newFilterGroups: Filter[][] = [];
        let currentGroup: Filter[] = [];

        this.filterGroups.flat().forEach((filter, index, array) => {
            const operator = filter.operator;
            currentGroup.push(filter);
            if (operator === 'and' && index !== array.length - 1) {
                newFilterGroups.push(currentGroup);
                currentGroup = [];
            }
        });

        if (currentGroup.length > 0) {
            newFilterGroups.push(currentGroup);
        }

        this.filterGroups = newFilterGroups;
        console.log('Filter groups after adjusting:', this.filterGroups);
    }

    //assez clair également
    countTotalFilters() {
        return this.filterGroups.reduce((total, group) => total + group.length, 0);
    }

    //rendu du dropdown
    renderDropdown(groupIndex: number, filterIndex: number) {
        if (this.openDropdownIndex === groupIndex * 100 + filterIndex) {
            const currentOperator = this.filterGroups[groupIndex][filterIndex].operator;
            const otherOption = currentOperator === 'or' ? 'and' : 'or';
            return html`
                <div class="absolute left-0 mt-1 w-32 z-10">
                    <div class="bb-badge-filter cursor-pointer group px-2" @click="${() => this.chooseOption(groupIndex, filterIndex, otherOption)}">
                        <span class="border-gray-600 group-hover:text-blueviolet-600 text-gray-600">${otherOption}</span>
                    </div>
                </div>
            `;
        }
        return null;
    }

    //rendu des filtres
    renderFilters() {
        const filterItems: any[] = [];
        this.filterGroups.forEach((group, groupIndex) => {
            group.forEach((filter, filterIndex) => {
                filterItems.push(html`
                    <div class="bb-badge-filter mb-1 mr-0.5">
                        ${filter.key} <span>${filter.condition}</span> ${filter.value}
                        <div class="-mr-2 bb-badge-filter__remove cursor-pointer hover:scale-125 ml-2" @click="${() => this.removeFilter(groupIndex, filterIndex)}">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"></path>
                            </svg>
                        </div>
                    </div>
                `);

                if (filterIndex < group.length - 1 || groupIndex < this.filterGroups.length - 1) {
                    filterItems.push(html`
                        <div class="inline-block mb-1 mr-0.5 relative">
                            <div class="bb-badge-filter cursor-pointer group px-2" @click="${() => this.toggleDropdown(groupIndex * 100 + filterIndex)}">
                                <span class="border-gray-600 group-hover:text-blueviolet-600 text-gray-600">${filter.operator}</span>
                            </div>
                            ${this.renderDropdown(groupIndex, filterIndex)}
                        </div>
                    `);
                }
            });
        });

        return filterItems;
    }

    //rendu général
    render() {
        const totalFilters = this.countTotalFilters();
        return html`
        <div class="flex flex-wrap items-center">
            <div class="mb-1 order-1 relative">
                <button type="button" class="bb-btn-secondary" @click="${this.toggleFilter}">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 mr-1.5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4"></path></svg>
                    Add filter
                </button>
                <div
                    class="absolute bg-white focus:outline-none left-0 md:h-96 md:w-[32rem] mt-1 origin-top-left ring-1 ring-black ring-opacity-5 rounded-md shadow w-80 z-20"
                    x-transition:enter="transition ease-out origin-top-left durée-200"
                    x-transition:enter-start="opacity-0 transform scale-90"
                    x-transition:enter-end="opacity-100 transform scale-100"
                    x-transition:leave="transition origin-top-left ease-in durée-100"
                    x-transition:leave-start="opacity-100 transform scale-100"
                    x-transition:leave-end="opacity-0 transform scale-90"
                    style="display: ${this.openAddFilter ? 'block' : 'none'};"
                >
                    <div class="h-full md:grid md:grid-cols-12 rounded-md text-sm">
                        <div class="bg-gray-50 col-span-4 md:rounded-l-md p-2 rounded-t-md">
                            <ul>
                                <li class="${this.selectedKey === 'Person' ? 'bg-blueviolet-200/50' : ''} cursor-pointer flex items-center p-2 rounded-md" @click="${() => this.selectKey('Person')}">
                                    <span> Person </span>
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 ml-auto w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"></path>
                                    </svg>
                                </li>
                                <li class="${this.selectedKey === 'Role' ? 'bg-blueviolet-200/50' : ''} cursor-pointer flex items-center p-2 rounded-md" @click="${() => this.selectKey('Role')}">
                                    <span> Role </span>
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 ml-auto w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"></path>
                                    </svg>
                                </li>
                            </ul>
                        </div>
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
                                                <div><input @input="${this.updateInput}" name="endswith" type="${this.selectedRadioFilter === 'endswith' ? 'text' : 'hidden'}" class="bb-input" .value="${this.selectedRadioFilter === 'endswith' ? this.inputValue : ''}" /></div>
                                            </div>
                                        </div>
                                        <div class="flex relative w-full">
                                            <div class="flex h-5 items-center"><input id="contains" aria-describedby="large-description" name="filter" type="radio" class="bb-radio" @click="${() => this.selectRadioFilter('contains')}" /></div>
                                            <div class="ml-3 text-sm">
                                                <label for="contains" class="text-gray-700">contains</label>
                                                <div><input @input="${this.updateInput}" name="contains" type="${this.selectedRadioFilter === 'contains' ? 'text' : 'hidden'}" class="bb-input" .value="${this.selectedRadioFilter === 'contains' ? this.inputValue : ''}" /></div>
                                            </div>
                                        </div>
                                        <div class="flex relative w-full">
                                            <div class="flex h-5 items-center"><input id="notcontains" aria-describedby="large-description" name="filter" type="radio" class="bb-radio" @click="${() => this.selectRadioFilter('notcontains')}" /></div>
                                            <div class="ml-3 text-sm">
                                                <label for="notcontains" class="text-gray-700">does not contain</label>
                                                <div><input @input="${this.updateInput}" name="notcontains" type="${this.selectedRadioFilter === 'notcontains' ? 'text' : 'hidden'}" class="bb-input" .value="${this.selectedRadioFilter === 'notcontains' ? this.inputValue : ''}" /></div>
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
            <div class="divide-x-3 lg:ml-6 lg:order-2 order-3 text-sm">
                ${this.renderFilters()}
            </div>
            ${totalFilters > 1 ? html`
                <button type="button" class="bb-btn-link lg:ml-6 lg:order-3 ml-auto order-2 px-0" @click="${this.removeAllFilters}">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 mr-1.5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                    </svg>
                    Remove all
                </button>
            ` : ''}
        </div>
        `;
    }
}
