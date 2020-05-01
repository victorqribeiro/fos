class Window extends HTMLElement {

	constructor(){
	
		super()
	
		this.shadow = this.attachShadow({mode: 'open'})
		
		this.isMoving = false
		
		this.lastTop = this.lastLeft = this.lastWidth = this.lastHeight = null
		
		this.index = 900
			
	}
	
	mouseUp(){
	
		this.isMoving = false
	
	}
	
	mouseDown(){
		
		this.isMoving = true
		
	}
	
	maximize(){

		if( this.lastTop !== null ){
		
			this.style.top = this.lastTop + "px"
			
			this.style.left = this.lastLeft + "px"
			
			this.style.width = this.lastWidth + "px"
			
			this.style.height = this.lastHeight + "px"
			
			this.lastTop = this.lastLeft = this.lastWidth = this.lastHeight = null
			
			this.fixed = false
		
		}else{
		
			let r = this.getBoundingClientRect()
			
			this.lastTop = r.top
			
			this.lastLeft = r.left
			
			this.lastWidth = r.width
			
			this.lastHeight = r.height

			this.style.top = 0
			
			this.style.left = 0
			
			this.style.width = innerWidth + "px"
			
			this.style.height = innerHeight + "px"
			
			this.fixed = true
			
		}

	}
	
	close(){

		this.style.display = "none"
	
	}
	
	bringFront(){
		
		const _windows = document.querySelectorAll("fos-window")
		
		for(const w of _windows){
		
			w.style.zIndex = 900
			
		}
		
		this.style.zIndex = 999
		
		this.render()
		
	}
	
	static get observedAttributes() {
	
    return ['name', 'title', 'fixed']
    
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

  get title() {
  
    return this.hasAttribute('title') ? this.getAttribute('title') : null
    
  }
  
  set title(val) {
  
    if (val)
    
      this.setAttribute('title', val)
      
    else
    
      this.removeAttribute('title')
    
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
  
  attributeChangedCallback(name, oldValue, newValue) {
  
		this.render()
  
  }
  
  connectedCallback() {
  
  	const howMany = document.querySelectorAll('fos-window').length || 1
  
  	this.top = innerHeight * 0.2 * howMany / 5 
  	
  	this.left = innerWidth * 0.1 * howMany / 5
  	
  	this.render()
  	
  }
  
  render(){
  
  	this.shadow.innerHTML = ""
  
  	const style = document.createElement('style')
  	
  	style.innerText = `
			:host{
				position: fixed;
				top: ${this.top}px;
				left: ${this.left}px;
				z-index: ${this.index};
				min-width: 320px;
				min-height: 240px;
				background-color: white;
				display: none;
				border: solid 2px #666;
				box-shadow: 5px 5px 5px;
				resize: both;
				overflow: auto;
			}
			#buttons{
				position: absolute;
				right: 0;
				top: 0;
			}
			#window{
				display: flex;
				flex-flow: column;
				height: 100%;
			}
			#top{
				flex: 0 1 auto;
				width: 100%;
				text-align: center;
				background-color: #888;
				cursor: move;
				position: relative;
			}
			#top > div > button {
				height: 25px;
			}
			#winTitle{
				line-height: 25px;
				cursor: inherit;
			}
			#content{
				flex: 1 1 auto;
				overflow: auto;
				position: relative;
				min-height: 205px;
			}
			#border{
				height: 10px;
				flex: 0 0 auto;
			}  	
  	`;
  
  	const _window = document.createElement('div')
  	_window.id = 'window'
  	_window.addEventListener('click', () => { this.bringFront() } )
			
  	const top = document.createElement('div')
  	top.part = 'top'
  	top.id = 'top'
  	top.addEventListener('mousedown', () => { this.mouseDown()  } )
  	top.addEventListener('mouseup', () => { this.mouseUp() } )
  	top.addEventListener('touchstart', () => { this.mouseDown()  } )
  	top.addEventListener('touchend', () => { this.mouseUp() } )
  	  	
  	const winTitle = document.createElement('div')
  	winTitle.id = 'winTitle'
  	winTitle.innerText = this.title
  	
  	const buttons = document.createElement('div')
  	buttons.id = 'buttons'
  	
  	const _max = document.createElement('button')
  	_max.innerText = "[]"
  	_max.part = "buttons"
  	_max.addEventListener('click', () => { this.maximize() } )
  	
  	const close = document.createElement('button')
  	close.innerText = "x"
  	close.part = "buttons"
  	close.addEventListener('click', () => { this.close() } )
  	
  	buttons.appendChild( _max )
  	buttons.appendChild( close )
  	
  	top.appendChild( winTitle )
  	top.appendChild( buttons )
  	
  	const content = document.createElement('div')
  	content.id = 'content'
  	
  	const slot = document.createElement('slot')

  	content.appendChild( slot )
  	
  	const border = document.createElement('div')
  	border.id = 'border'
  	
  	_window.appendChild( top )
  	_window.appendChild( content )
  	_window.appendChild( border )
  
  	this.shadow.appendChild( style )
  	
  	this.shadow.appendChild( _window )
  			
  }
  
}

customElements.define('fos-window', Window);
