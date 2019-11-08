class Panel extends HTMLElement {

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
  
  bringFront(){
  
  	const panels = this.parentNode.querySelectorAll('fos-panel')
  	
  	for( const panel of panels ){
  	
  		panel.style.display = "none"
  		
  		panel.selected = false
  	
  	}
  	
  	this.style.display = "block"
  	
  	this.selected = true
  
  }
  
	static get observedAttributes() {
	
    return ['name', 'selected']
    
  }
  
  get selected() {
  
  	return this.hasAttribute('selected') ? true : false
  	
  }
  
  set selected(val) {
    if (val)
    
      this.setAttribute('selected', true)
      
    else
    
      this.removeAttribute('selected')

  }
  
  get name() {
  
    return this.hasAttribute('name') ? this.getAttribute('name') : null
    
  }
  
  set name(val) {
  
    if (val)
    
      this.setAttribute('name', val)
      
    else
    
      this.removeAttribute('name')
      
  }

  render(){
  
  	this.shadow.innerHTML = `
			<style>
				:host{
					display: `+(this.selected ? 'block' : 'none')+`;
				}
			</style>
			<slot></slot>
		`;
		
  }
  
}

customElements.define('fos-panel', Panel)
