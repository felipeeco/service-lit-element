import { LitElement, html} from 'lit';
import './components/GetData.js';
import styles from './service-lit.styles.js'

class ServiceLit extends LitElement {
  
  static is() {
    return 'service-lit'
  }
  
  static properties = {
    wiki: { type: Array },
  }

  static get styles() {
    return [styles]
  }
  
  constructor() {
    super();
  }

  firstUpdated() {
    this.addEventListener('ApiData', (e)=> {
      this._dataFormat(e?.detail?.data?.results);
    });
  }

  _dataFormat(data) {
    this.wiki = data?.map((character) => {
      return {
        img: character?.image,
        name: character?.name,
        species: character?.species,
        status: character?.status
      }
    });
  }

  get dataTemplate() {
    return html`
      ${this.wiki.map((character) => {
        return html`
          <div class="card">
            <div class="card-content">
              <h2>${ character.name }</h2>
              <img src="${ character.img }">
              <p>${ character.species } | ${ character.status }</p>
            </div>
          </div>
        `  
      })}
    `;
  }

  render() {
    return html`
      <h1>Service LitElement Component</h1>
      <get-data url="https://rickandmortyapi.com/api/character/?page=19" method='GET'></get-data>
      ${this.wiki && this.dataTemplate}

    `;
  }  
}

customElements.define(ServiceLit.is(), ServiceLit);