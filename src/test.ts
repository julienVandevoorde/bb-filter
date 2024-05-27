import { LitElement, css, html } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'


  @customElement('bb-filter')
  export class BbFilter extends LitElement {
    @state() showMenu= false;

    createRenderRoot() {
        return this;
    }

  render () {
    return html`
    <div class="mb-1 order-1 relative" x-data="{ openAddFilter: false }">

        <button type="button" class="bb-btn-secondary">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 mr-1.5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4"></path></svg> Add filter
        </button>
        <div
            
            class="absolute bg-white focus:outline-none left-0 md:h-96 md:w-[32rem] mt-1 origin-top-left ring-1 ring-black ring-opacity-5 rounded-md shadow w-80 z-20"
            x-transition:enter="transition ease-out origin-top-left duration-200"
            x-transition:enter-start="opacity-0 transform scale-90"
            x-transition:enter-end="opacity-100 transform scale-100"
            x-transition:leave="transition origin-top-left ease-in duration-100"
            x-transition:leave-start="opacity-100 transform scale-100"
            x-transition:leave-end="opacity-0 transform scale-90"
            
            
        >
            <div class="h-full md:grid md:grid-cols-12 rounded-md text-sm">
                <div class="bg-gray-50 col-span-4 md:rounded-l-md p-2 rounded-t-md">
                    <ul>
                        <li class="cursor-pointer flex hover:bg-blueviolet-200/50 items-center p-2 rounded-md">
                            <span> Date </span>
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 ml-auto w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"></path>
                            </svg>
                        </li>
                        <li class="cursor-pointer flex hover:bg-blueviolet-200/50 items-center p-2 rounded-md">
                            <span> Status </span>
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 ml-auto w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"></path>
                            </svg>
                        </li>
                        <li class="bg-blueviolet-200/50 cursor-pointer flex items-center p-2 rounded-md">
                            <span> Email </span>
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 ml-auto w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"></path>
                            </svg>
                        </li>
                        <li class="cursor-pointer flex hover:bg-blueviolet-200/50 items-center p-2 rounded-md">
                            <span> Company </span>
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 ml-auto w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"></path>
                            </svg>
                        </li>
                    </ul>
                </div>
                <div class="bg-white col-span-8 md:rounded-r-md p-4 rounded-b-lg">
                    <form class="flex flex-col h-full">
                        <fieldset>
                            <div class="space-y-4">
                                <div class="flex relative">
                                    <div class="flex h-5 items-center"><input id="is" aria-describedby="small-description" name="filter" type="radio" class="bb-radio" /></div>
                                    <div class="ml-3 text-sm"><label for="is" class="text-gray-700">is</label></div>
                                </div>
                                <div class="flex relative w-full">
                                    <div class="flex h-5 items-center"><input id="isnot" aria-describedby="medium-description" name="filter" type="radio" class="bb-radio" /></div>
                                    <div class="ml-3 text-sm">
                                        <label for="isnot" class="text-gray-700">is not</label>
                                        <p id="small-description" class="text-gray-500">Decription if needed</p>
                                    </div>
                                </div>
                                <div class="flex relative w-full">
                                    <div class="flex h-5 items-center"><input id="startswith" aria-describedby="large-description" name="filter" type="radio" class="bb-radio" /></div>
                                    <div class="ml-3 text-sm"><label for="startswith" class="text-gray-700">starts with</label></div>
                                </div>
                                <div class="flex relative w-full">
                                    <div class="flex h-5 items-center"><input id="endswith" aria-describedby="large-description" name="filter" type="radio" class="bb-radio" /></div>
                                    <div class="ml-3 text-sm"><label for="endswith" class="text-gray-700">ends with</label></div>
                                </div>
                                <div class="flex relative w-full">
                                    <div class="flex h-5 items-center"><input checked="" id="contains" aria-describedby="large-description" name="filter" type="radio" class="bb-radio" /></div>
                                    <div class="ml-3 text-sm">
                                        <label for="contains" class="text-gray-700">contains</label>
                                        <div><input name="is" type="text" class="bb-input" value="alicia" /></div>
                                    </div>
                                </div>
                                <div class="flex relative w-full">
                                    <div class="flex h-5 items-center"><input id="notcontains" aria-describedby="large-description" name="filter" type="radio" class="bb-radio" /></div>
                                    <div class="ml-3 text-sm"><label for="notcontains" class="text-gray-700">does not contain</label></div>
                                </div>
                            </div>
                        </fieldset>
                        <div class="mt-auto pt-8 text-center"><button type="button" class="bb-btn-link mr-2">Cancel</button> <button type="button" class="bb-btn-secondary">Add filter</button></div>
                    </form>
                </div>
            </div>
        </div>
    </div>  
    `
  }
}