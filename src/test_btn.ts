import { LitElement, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';

@customElement('bb-filter')
export class BbFilter extends LitElement {
    @state() openDropdown: boolean = false;
    @state() selectedDropdown: string = 'or';

    createRenderRoot(){
        return this;
    }

    toggleDropdown() {
        this.openDropdown = !this.openDropdown;
    }

    chooseOption(option: string) {
        this.selectedDropdown = option;
        this.openDropdown = false; // Ferme le dropdown après la sélection
    }

    render() {
        return html`
            <div class="inline-block mb-1 mr-0.5 relative">
                <div class="bb-badge-filter cursor-pointer group px-2" @click="${this.toggleDropdown}">
                    <span class="border-gray-600 group-hover:text-blueviolet-600 text-gray-600">${this.selectedDropdown}</span>
                </div>
                <div class="${this.openDropdown ? '' : 'hidden'} -bottom-full absolute bb-badge-filter cursor-pointer group left-0 origin-top-left px-2 shadow translate-y-1 z-10">
                    <div class="flex group-hover:text-blueviolet-600 h-full items-center justify-center text-gray-800" @click="${() => this.chooseOption(this.selectedDropdown === 'or' ? 'and' : 'or')}">
                        ${this.selectedDropdown === 'or' ? 'and' : 'or'}
                    </div>
                </div>
            </div>
        `;
    }
}
