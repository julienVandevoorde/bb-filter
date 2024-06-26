import { LitElement, html } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'


@customElement('bb-filter')
export class BbFilter extends LitElement {
    @state() openAddFilter= false;
    @state() openDropdown= false;
    @state() selectedRadioFilter= '';
    @state() selectedTitle= 'Person';
    
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

    render () {
        return html`
        <div class="flex flex-wrap items-center">
            <!--la div ci dessous contient ce qui est lié au bouton add filter-->
            <div class="mb-1 order-1 relative" x-data="{ openAddFilter: false }">
                <button type="button" class="bb-btn-secondary" @click="${this.toggleFilter}">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 mr-1.5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4"></path></svg> Add
                    filter
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
                            <form class="flex flex-col h-full">
                                <fieldset>
                                    <div class="space-y-4">
                                        <div class="flex relative w-full">
                                            <div class="flex h-5 items-center"><input id="startswith" aria-describedby="large-description" name="filter" type="radio" class="bb-radio" @click="${() => this.selectRadioFilter('startswith')}" /></div>
                                            <div class="ml-3 text-sm">
                                                <label for="startswith" class="text-gray-700">starts with</label>
                                                <div><input name="startswith" type="${this.selectedRadioFilter === 'startswith' ? 'text' : 'hidden'}" class="bb-input" value="" /></div>
                                                </div>
                                        </div>
                                        <div class="flex relative w-full">
                                            <div class="flex h-5 items-center"><input id="endswith" aria-describedby="large-description" name="filter" type="radio" class="bb-radio" @click="${() => this.selectRadioFilter('endswith')}" /></div>
                                            <div class="ml-3 text-sm">
                                                <label for="endswith" class="text-gray-700">ends with</label>
                                                <div><input name="endswith" type="${this.selectedRadioFilter === 'endswith' ? 'text' : 'hidden'}" class="bb-input" value="" /></div>
                                                </div>
                                        </div>
                                        <div class="flex relative w-full">
                                            <div class="flex h-5 items-center"><input id="contains" aria-describedby="large-description" name="filter" type="radio" class="bb-radio" @click="${() => this.selectRadioFilter('contains')}" /></div>
                                            <div class="ml-3 text-sm">
                                                <label for="contains" class="text-gray-700">contains</label>
                                                <div><input name="contains" type="${this.selectedRadioFilter === 'contains' ? 'text' : 'hidden'}" class="bb-input" value="" /></div>
                                            </div>
                                        </div>
                                        <div class="flex relative w-full">
                                            <div class="flex h-5 items-center"><input id="notcontains" aria-describedby="large-description" name="filter" type="radio" class="bb-radio" @click="${() => this.selectRadioFilter('notcontains')}" /></div>
                                            <div class="ml-3 text-sm">
                                                <label for="notcontains" class="text-gray-700">does not contain</label>
                                                <div><input name="notcontains" type="${this.selectedRadioFilter === 'notcontains' ? 'text' : 'hidden'}" class="bb-input" value="" /></div>
                                                </div>
                                        </div>
                                    </div>
                                </fieldset>
                                <div class="mt-auto pt-8 text-center">
                                    <button type="button" class="bb-btn-link mr-2" @click="${this.toggleFilter}">Cancel</button> 
                                    <button type="button" class="bb-btn-secondary">Add filter</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <!--la div ci dessous contient le bouton remove all-->
            <button type="button" class="bb-btn-link lg:ml-6 lg:order-3 ml-auto order-2 px-0">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 mr-1.5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                </svg>
                Remove all
            </button>
            <!--la div ci dessous contient le filtre en lui même (ex : person start with J etc)-->
            <div class="divide-x-3 lg:ml-6 lg:order-2 order-3 text-sm">
                <!--la div ci dessous contient le badge filter ("or" group)-->
                <div class="filter-group flex-wrap inline-flex">
                    <div class="bb-badge-filter mb-1 mr-0.5">
                        Person <span>contains</span> voorde
                        <div class="-mr-2 bb-badge-filter__remove cursor-pointer hover:scale-125 ml-2">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"></path></svg>
                        </div>
                    </div>
                    <div class="inline-block mb-1 mr-0.5 relative" x-data="{ openDropdown: false }">
                        <div @click.stop="openDropdown = ! openDropdown" class="bb-badge-filter cursor-pointer group px-2"><span class="border-gray-600 group-hover:text-blueviolet-600 text-gray-600">or</span></div>
                        <div x-show="openDropdown" @click.away="openDropdown = false" class="-bottom-full absolute bb-badge-filter cursor-pointer group left-0 origin-top-left px-2 shadow translate-y-1 z-10" style="display: none;">
                            <div class="flex group-hover:text-blueviolet-600 h-full items-center justify-center text-gray-800">and</div>
                        </div>
                    </div>
                    <div class="bb-badge-filter mb-1 mr-0.5">
                        Person <span>contains</span> vande
                        <div class="-mr-2 bb-badge-filter__remove cursor-pointer hover:scale-125 ml-2">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"></path></svg>
                        </div>
                    </div>
                    <!--rendre le bouton '+' fonctionnel en réouvrant le menu des filtres-->
                    <div class="bb-badge-filter cursor-pointer group px-2" @click="${this.toggleFilter}">
                        <svg xmlns="http://www.w3.org/2000/svg" class="group-hover:scale-125 h-5 text-blueviolet-600 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                        </svg>
                    </div>
                </div>
                <span class="mb-1 mx-1.5 text-gray-600">and</span>
                <!--la div ci dessous contient le badge filter ("and" group)-->
                <div class="filter-group flex-wrap inline-flex">
                    <div class="bb-badge-filter mb-1">
                        Role <span>starts with</span> R
                        <div class="-mr-2 bb-badge-filter__remove cursor-pointer hover:scale-125 ml-2">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"></path></svg>
                        </div>
                    </div>
                    <!--rendre le bouton '+' fonctionnel en réouvrant le menu des filtres-->
                    <div class="bb-badge-filter cursor-pointer group mb-1 ml-0.5 px-2" @click="${this.toggleFilter}">
                        <svg xmlns="http://www.w3.org/2000/svg" class="group-hover:scale-125 h-5 text-blueviolet-600 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    `
    }
}