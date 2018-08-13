document.addEventListener('DOMContentLoaded', ()=>{
  pageNumber = 1
  form = document.querySelector('#createForm')
  divMonsterContainer = document.querySelector('#monster-container')
  backButton = document.querySelector('#back')
  forwardButton = document.querySelector('#forward')



  window.addEventListener('load', fetchMonsters)
  form.addEventListener('submit', clickHandler)
  backButton.addEventListener('click', goBack)
  forwardButton.addEventListener('click', goForward)
})

let fetchMonsters = ()=>{
  fetch(`http://localhost:3000/monsters/?_limit=50&_page=${pageNumber}`)
  .then(res => res.json())
  .then(json => json.forEach((monster)=>{
    createMonster(monster)
  }))
}

function createMonster(monster){
  div = document.createElement('div')
  let h2 = document.createElement('h2')
  h2.innerText = monster.name
  let h4 = document.createElement('h4')
  h4.innerText = monster.age
  let p = document.createElement('p')
  p.innerText = monster.description
  divMonsterContainer.appendChild(div)
  div.appendChild(h2)
  div.appendChild(h4)
  div.appendChild(p)
}

 function goForward(e){
   e.preventDefault()
  divMonsterContainer.innerHTML = ""
  if(pageNumber < 10){
    pageNumber += 1
    fetchMonsters()
  }
  else{
    alert('Aint no more monsters here')
  }
}

function goBack(e){
  e.preventDefault()
  divMonsterContainer.innerHTML = ""
  if(pageNumber > 1){
    pageNumber -= 1
    fetchMonsters()
  }
  else{
    alert('Aint no monsters here')
  }
}

function clickHandler(e){
  e.preventDefault()
  let name = document.querySelector('#inputName').value
  let age = document.querySelector('#inputAge').value
  let description = document.querySelector('#inputDescription').value
  addMonster(name, age, description)
}

function addMonster(name, age, description){
    fetch('http://localhost:3000/monsters',{
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        age: age,
        description: description
      })
    })
}
