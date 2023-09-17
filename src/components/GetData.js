import { LitElement } from 'lit';

export class GetData extends LitElement {
    static is() {
        return 'get-data'
    }

    static properties = {
        url: { 
            type: String,
            attribute: 'url',
            reflect: true,
         },
        method: { 
            type: String,
            attribute: 'method',
            reflect: true, 
        },
      }

    constructor() {
        super();
    }

    firstUpdated() {
        this.getData();
    }

    _sendData(data) {
        this.dispatchEvent(new CustomEvent('ApiData', {
            detail: { data },
            bubbles: true,
            composed: true
        }));
    }

    getData() {
        fetch(this.url, { method: this.method})
        .then((response) => {
            if(response.ok) return response.json();
            return Promise.reject(response);
       })
       .then((data) => { this._sendData(data)})
       .catch((error) => { console.warm('Something went wrong', error)})
    }

}

customElements.define(GetData.is(), GetData)