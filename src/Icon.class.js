class Icon extends HTMLElement {

	constructor(){
	
		super()
			
		this.shadow = this.attachShadow({mode: 'open'})
		
		this.dblClick = () => {
			
			let _w = document.querySelector(`fos-window[name=${this.control}] `)
			
			if( _w ){
			
				_w.style.display = 'block'
				
				_w.bringFront()
				
			}
				
		}
		
		this.addEventListener('dblclick', this.dblClick )
		
		this.tapedTwice = false
		
		this.addEventListener("touchstart", e=>{
		
			if(!this.tapedTwice) {
			
		      this.tapedTwice = true
		      
		      setTimeout( ()=>{ this.tapedTwice = false; }, 300 )
		      
		      return false
		  }
		  
		  e.preventDefault()
		  
		  this.dblClick()
		  
		})
		
	}
	
	calcPos(){
	
		if( !this.parentNode )
		
			return
	
		const parent = this.parentNode.getBoundingClientRect()

		const x = Math.floor( (parent.width ? parent.width : 320) / ( 64 + 8 ) )
		
		const howMany = this.i
		
		const offset = parseInt( this.parentNode.iconOffset ) || 0
		
		this.top = ( 8 + Math.floor(howMany / x) * (64 + 8) ) + offset
			
		this.left = 8 + (64 + 8) * (howMany % x)

	}
	
	attributeChangedCallback(name, oldValue, newValue) {

		this.render()
  
  }
  
  connectedCallback() {
  
  	this.i = this.parentNode.querySelectorAll('fos-icon').length - 1
 
  	this.render()
  	
  }
	
	static get observedAttributes() {
	
    return ['href', 'fixed']
    
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
				overflow: hidden;
				-webkit-touch-callout: none;
					-webkit-user-select: none;
					 -khtml-user-select: none;
						 -moz-user-select: none;
							-ms-user-select: none;
							    user-select: none;
			}
		</style>
		<slot></slot>
	`;
		
	}

}

customElements.define('fos-icon', Icon)
