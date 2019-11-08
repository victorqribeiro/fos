class MenuItem extends HTMLElement {

	constructor(){
	
		super()
	
		this.shadow = this.attachShadow({mode: 'open'})
		
		this.addEventListener('click', e => {
		
			let elem = this.parentNode
			
			do{
			
				elem = elem.parentNode
				
			}while( elem.localName !== "fos-bar" )
		
			let _w = elem.parentNode.querySelector(`*[name=${this.control}] `)
			
			if( _w ){
			
				_w.style.display = 'block'
				
				_w.bringFront()
				
			}
		
		});

	}
	
  
  attributeChangedCallback(name, oldValue, newValue) {
  
		this.render()
  
  }
  
  connectedCallback() {
  
  	this.render()
  	
  }
  
	static get observedAttributes() {
	
    return ['href']
    
  }
  
  get control() {
  
    return this.hasAttribute('href') ? this.getAttribute('href') : null
    
  }
  
  set control(val) {
    if (val)
    
      this.setAttribute('href', val)
      
    else
    
      this.removeAttribute('href')

  }

  render(){
  
  	this.shadow.innerHTML = `
			<style>
				:host{
					display:block;
					background-color: inherit;
				}
				div:hover{
					color: gray;
				}
			</style>
			<div><slot></slot></div>
		`;
		
  }
  
}

customElements.define('fos-menu-item', MenuItem)
