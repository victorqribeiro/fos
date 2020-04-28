class Desktop extends HTMLElement {

	constructor(){
		
		super()
		
		this.shadow = this.attachShadow({mode: 'open'})
		
		this.selected = null;
		
		this.addEventListener('mousedown', e => {
		
			if( 'button' in e && e.button === 0 )
		
				this.mouseDown( e )
			
		})
		
		this.addEventListener('mouseup', this.mouseUp )
		
		this.addEventListener('mousemove', this.mouseMove )
		
		this.addEventListener('touchstart', this.mouseDown )
		
		this.addEventListener('touchend', this.mouseUp )
		
		this.addEventListener('touchmove', this.mouseMove )
		
		this.addEventListener("dragstart", e => e.preventDefault() )
		
		const resizeObserver = new ResizeObserver(() => {
		
				this.updateIcons()
				
		})
		
		resizeObserver.observe(this)

	}
	
	updateIcons(){
	
	  const icons = this.querySelectorAll('fos-icon')
  	
  	for(const i of icons)
  	
  		i.render()
  		
	}
	
	mouseUp(){
	
		this.selected = null;
	
	}
	
	mouseDown(e){
	
		const path = e.path || (e.composedPath && e.composedPath())
	
		this.lastX = e.pageX || (e.touches ? e.touches[0].pageX : 0)
		
		this.lastY = e.pageY || (e.touches ? e.touches[0].pageY : 0)
		
		for(let i = 0; i < path.length; i++){
		
			if( path[i].localName === 'fos-icon' ){
			
				this.selected = path[i]
				
				break
				
			}else if( path[i].localName === 'fos-window' && path[i].isMoving ){
			
				this.selected = path[i]
				
				break
			
			}
		
		}
		
	}
	
	mouseMove(e){
	
		if( !this.selected || this.selected.fixed ) return	
		
		e.preventDefault()
		
		if( this.selected.localName === 'fos-icon' ){
		
			const x = e.pageX || (e.touches ? e.touches[0].pageX : 0)
			
			const y = e.pageY || (e.touches ? e.touches[0].pageY : 0)
		
			this.selected.style.left = Math.floor(x/8) * 8 - (this.selected.offsetWidth/2) + "px"
			
			this.selected.style.top = Math.floor(y/8) * 8 - (this.selected.offsetHeight/2) + "px"
			
		} else {
		
			let newX = e.pageX || (e.touches ? e.touches[0].pageX : 0)
			
			let newY = e.pageY || (e.touches ? e.touches[0].pageY : 0)
			
			this.selected.style.left = this.selected.offsetLeft + (newX - this.lastX) + "px"
			
			this.selected.style.top = this.selected.offsetTop + (newY - this.lastY) + "px"
		
			this.lastX = newX
			
			this.lastY = newY
			
		}
		
	}

	static get observedAttributes() {
	
    return ['iconOffset']
    
  }	

	get iconOffset() {
  
    return this.hasAttribute('iconOffset') ? this.getAttribute('iconOffset') : null
    
  }
  
  set iconOffset(val) {
  
    if (val)
    
      this.setAttribute('iconOffset', val)
      
    else
    
      this.removeAttribute('iconOffset')
    
  }
  
  attributeChangedCallback(name, oldValue, newValue) {
  
		this.render()
  
  }
  
  connectedCallback() {
  	
  	this.render()
  	
  }
  
  render(){
  
  	this.shadow.innerHTML = `
			<style>
				:host{
					position: relative;
					display: block;
					width: 100%;
					height: 100%;
					min-height: 240px;
					min-width: 320px;
					background-color: #666;
					overflow: auto;
				}
			</style>
			<slot></slot>
		`;
		
  }

}

customElements.define('fos-desktop', Desktop)
