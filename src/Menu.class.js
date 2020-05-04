class Menu extends HTMLElement {

	constructor(){
	
		super()
	
		this.shadow = this.attachShadow({mode: 'open'})
		
		this.addEventListener('click', e => {
			
			/*
			const menus = document.querySelectorAll('fos-menu')
			
			
			for(const menu of menus)
			
				menu.visible = false
				
			*/
			
			this.visible = true
			
		
		});
		
		document.body.addEventListener('click', e => {
		
		if( e.target.localName !== 'fos-menu' )
		
			this.visible = false
		
		});
		
	}
	
  
  attributeChangedCallback(name, oldValue, newValue) {

		this.render()
  
  }
  
  connectedCallback() {
  
  	this.bar = this.parentNode
  	
  	while( this.bar.tagName !== 'FOS-BAR' )
  	
  		this.bar = this.bar.parentNode
  
  	this.render()
  	
  }
  
	static get observedAttributes() {
	
    return ['name', 'visible']
    
  }

  get visible() {
  
    return this.hasAttribute('visible') ? true : false
    
  }
  
  set visible(val) {
  
    if(val)
    
      this.setAttribute('visible', true)
      
    else
    
      this.removeAttribute('visible')

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
					display: inline-block;
					cursor: default;
				}
				#menu{
					display: `+(this.visible ? 'block' : 'none')+`;
					position: absolute;
					`+(this.bar ? this.bar.position : 'bottom')+`: 40px;
					background-color: #AAA;
					padding: 1em;
					border: solid 1px black;
					border-`+(this.bar ? this.bar.position : 'bottom')+`: 0;
				}
				#title:hover{
					color: gray;
				}
			</style>
			<div>
				<div id="title" part="title">${this.name}</div>
				<div id="menu" part="window"><slot></slot></div>
			</div>
		`;
		
  }
  
}

customElements.define('fos-menu', Menu)
