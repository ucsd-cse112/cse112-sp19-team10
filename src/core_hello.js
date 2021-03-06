let template = window.document.createElement('template')
template.innerHTML = `
    <style>
        h1{
            font-size: var(--font-size, 50px);
            font-family: var(--font-family, Courier New);
        }

        :host([rainbow]){
            animation: rainbow 3s infinite;
        }

        @keyframes rainbow{
            0%{color: red;}
            15%{color: orange;}
            30%{color: yellow;}
            45%{color: limegreen;}
            60%{color: blue;}
            75%{color: darkviolet;}
            90%{color: hotpink;}
            100%{color: red;}
        }
    </style>
    <h1><span id="hello"></span> <slot></slot></h1>
`
/**
 * CoreHello class
 */
class CoreHello extends window.HTMLElement {
  // Rainbow attribute
  get rainbow () {
    return this.hasAttribute('rainbow')
  }

  set rainbow (val) {
    if (val) {
      this.setAttribute('rainbow', '')
    } else {
      this.removeAttribute('rainbow')
    }
    this.toggleRainbow()
  }

  // Lang attribute
  get lang () {
    return this.getAttribute('lang')
  }

  set lang (val) {
    this.setAttribute('lang', val)
  }

  constructor () {
    super()

    // Attach shadow root
    const shadowRoot = this.attachShadow({ mode: 'open' })
    shadowRoot.appendChild(template.content.cloneNode(true))

    // Place holder for message in specified language
    this.language = shadowRoot.querySelector('#hello')
  }

  connectedCallback () {
    // Default language
    if (!this.hasAttribute('lang')) {
      this.setAttribute('lang', 'en')
    }
  }

  static get observedAttributes () {
    return ['lang']
  }

  attributeChangedCallback (name, oldValue, newValue) {
    if (this.getAttribute('lang') === 'en') {
      this.language.innerText = 'Hello World'
    } else if (this.getAttribute('lang') === 'es') {
      this.language.innerText = 'Hola Mundo'
    } else if (this.getAttribute('lang') === 'ko') {
      this.language.innerText = '안녕하세요 세계'
    } else if (this.getAttribute('lang') === 'ge') {
      this.language.innerText = 'Hallo Welt'
    }
  }
}

window.customElements.define('core-hello', CoreHello)
