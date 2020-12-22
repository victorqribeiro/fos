class Icon extends HTMLElement {

	constructor(){
	
		super()
			
		this.shadow = this.attachShadow({mode: 'open'})
		
		this.open = (e) => {
			
			let _w = document.querySelector(`fos-window[name=${this.control}] `)
			
			if( _w ){
			
				_w.style.display = 'block'
				
				_w.bringFront()
				
			}
				
		}
		
		this.addEventListener('dblclick', this.open )
		
		this.addEventListener('keydown', e => {
		
 		  if( e.keyCode !== 13 ) return
		
		  this.open()
		
		})
		
		this.tapedTwice = false
		
		this.addEventListener("touchstart", e=>{
		
			if(!this.tapedTwice) {
			
		      this.tapedTwice = true
		      
		      setTimeout( ()=>{ this.tapedTwice = false }, 300 )
		      
		      return false
		  }
		  
		  e.preventDefault()
		  
		  this.open()
		  
		})
		
	}
	
	calcPos(){
	
		if( !this.parentNode )
		
			return
	
		const parent = this.parentNode.getBoundingClientRect()

		const x = Math.floor( (parent.width ? parent.width : 320) / ( 64 + 8 ) )
		
		const howMany = this.i
		
		const offset = parseInt( this.parentNode.iconOffset ) || 0
		
		this.top = ( 8 + Math.floor(howMany / x) * (96 + 8) ) + offset
			
		this.left = 8 + (64 + 8) * (howMany % x)

	}
	
	attributeChangedCallback(name, oldValue, newValue) {

		this.render()
  
  }
  
  connectedCallback() {
  
  	if (!this.hasAttribute('tabindex')) {
	  
      this.setAttribute('tabindex', 0)
      
    }
  
  	this.i = this.parentNode.querySelectorAll('fos-icon').length - 1
 
  	this.render()
  	
  }
	
	static get observedAttributes() {
	
    return ['href', 'fixed', 'name']
    
  }
  
  get fixed() {
  
  	return this.hasAttribute('fixed') ? this.getAttribute('fixed') : null
  
  }
  
  set fixed(val) {
  
    if (val)
    
      this.setAttribute('fixed', val)
      
    else
    
      this.removeAttribute('fixed')
  
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

		this.calcPos()

		this.shadow.innerHTML = `
		<style>
			:host{
				display: flex;
				align-items: center;
				justify-content: center;
				position: absolute;
				top: ${this.top}px;
				left: ${this.left}px;
				width: 64px;
				height: 64px;
				background-color: rgba(255,50,25,0.9);
				color: white;
				line-height: 64px;
				font-family: Verdana;
				font-size: 32px;
				border-radius: 5px;
				box-shadow: 3px 3px 5px rgba(0,0,0,0.3);
				-webkit-touch-callout: none;
					-webkit-user-select: none;
					 -khtml-user-select: none;
						 -moz-user-select: none;
							-ms-user-select: none;
							    user-select: none;
			}
      ::after {
        content: '${this.name ? this.name : ''}';
        position: absolute;
        top: 76px;
        font-size: 0.5em;
        line-height: 1em;
      }
		</style>
		<slot></slot>
	`;
		
	}

}

customElements.define('fos-icon', Icon)
