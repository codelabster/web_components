//Create custom element based on V1 specs
//reference https://developers.google.com/web/fundamentals/web-components/customelements
class MyCustomElement extends HTMLElement{
	constructor(){
		super()
		//shadowRoot
		this.shadow=this.attachShadow({mode:'open'})	
	}

	static get observedAttributes(){
		//detect if attribute was changed
		return ['data-value']
	}

	get dataValue(){
		return this.hasAttribute('data-value');
	}

	set dataValue(val){
		console.log(val)
	}

	attributeChangedCallback(attr,ov,nv){
		//executed when attribute defined in observedAttributes() was changed
		this.getValue()
		console.log('changed')
	}

	connectedCallback() {
		//inesrted into DOM
		console.log('connected')
	}

	disconnectedCallback(){
		//removed from DOM
		console.log('deleted')
	}

	getValue(){
		//changed the HTML 
		let tmp=this.createTemplate(`${this.getAttribute('data-value')}`)
		this.shadow.appendChild(tmp.content.cloneNode(true))
	}

	createTemplate(val){
		//create template
		let tmp=document.createElement('template')
		tmp.innerHTML=`<center><h3>${val}</h3><slot></slot></center>`

		return tmp
	}
}

customElements.define('my-custom-element',MyCustomElement)