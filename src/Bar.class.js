class Bar extends HTMLElement {

	constructor(){
	
		super()
	
		this.shadow = this.attachShadow({mode: 'open'})
		
	}
	
  
	attributeChangedCallback(name, oldValue, newValue) {

		this.render()
  
  }
  
  connectedCallback() {
  
  	this.render()
  	
  }
	
	static get observedAttributes() {
	
    return ['position']

  }
  
  get position() {
  
    return this.hasAttribute('position') ? this.getAttribute('position') : 'bottom'
    
  }
  
  set position(val) {
  
    if (val && (val === "top" || val === "bottom") )
    
      this.setAttribute('position', val)
    
    else
    
      this.removeAttribute('position')
  }
  
  render(){
  
  	this.shadow.innerHTML = `
			<style>
				:host{
					position: absolute;
					${this.position}: 0;
					left: 0;
					z-index: 1000;
					background-color: #AAA;
					width: 100%;
					height: 40px;
					display: flex;
					align-items: center;
					justify-content: flex-start;
					box-shadow: 0px 0px 5px black;
					box-sizing: border-box;
					padding-left: 10px;
				}
			</style>
			<slot></slot>
		`;
		
  }
  
}

customElements.define('fos-bar', Bar)
