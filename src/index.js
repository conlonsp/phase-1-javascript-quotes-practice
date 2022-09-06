let quoteList = document.querySelector('#quote-list')

fetch('http://localhost:3000/quotes?_embed=likes')
.then(resp => resp.json())
.then(quotesArr => {
  quotesArr.forEach(quoteObj => {
    getQuote(quoteObj)
  })
})

function getQuote(quoteObj) {
  let li = document.createElement('li')
  li.className = 'quote-card'
  li.innerHTML = `<blockquote class="blockquote">
                    <p class="mb-0">${quoteObj.quote}</p>
                    <footer class="blockquote-footer">${quoteObj.author}</footer>
                    <br>
                    <button class='btn-success'>Likes: <span>${quoteObj.likes.length}</span></button>
                    <button class='btn-danger'>Delete</button>
                  </blockquote>`
  quoteList.append(li)
  deleteQuote(quoteObj, li)
  likeQuote(quoteObj, li)
}
  
function deleteQuote(quoteObj, li) {
  let deleteBtn = li.querySelector('.btn-danger')
  deleteBtn.addEventListener('click', event => {
    fetch(`http://localhost:3000/quotes/${quoteObj.id}`, {
      method: 'DELETE'
    })
    .then(resp => resp.json())
    .then(obj => li.remove(obj))
  })
}

function likeQuote(quoteObj, li) {
  let likeObj = {
    "id": quoteObj.likes.length++,
    "quoteId": quoteObj.id,
    "createdAt": Math.floor(Date.now() / 1000)
}
  let span = li.querySelector('span')
  let likeBtn = li.querySelector('.btn-success')
  likeBtn.addEventListener('click', event => {
    fetch('http://localhost:3000/likes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify(likeObj)
    })
    .then(resp => resp.json())
    .then(newLike => {
      quoteObj.likes.push(newLike)
      span.innerText++
    })
  })
}

function createQuote() {
  const form = document.getElementById('new-quote-form')
  form.addEventListener('submit', event => {
    event.preventDefault()
    let newAuthor = event.target.author.value
    let newQuote = event.target['new-quote'].value
    fetch('http://localhost:3000/quotes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        'quote': newQuote,
        'author': newAuthor
      })
    })
    .then(resp => resp.json())
    .then(quote => {
      quote.likes = []
      getQuote(quote)
    })
    form.reset()
  })
}
createQuote()







// {
//   "quotes": [
//     {
//       "id": 1,
//       "quote": "Expect nothing. Live frugally on surprise.",
//       "author": "Alice Walker"
//     },
//     {
//       "id": 2,
//       "quote": "Y’all is the best, most inclusive, second-person, plural pronoun in the English-speaking world.",
//       "author": "Hannah Gadsby"
//     },
//     {
//       "id": 3,
//       "quote": "today a man on the street pointed to me & said ‘what the hell is that!?’ i wanted to turn around, tell him that i got this dress on sale & i got this body for free but you have been making me pay for both ever since.",
//       "author": "Alok Vaid Menon"
//     },
//     {
//       "id": 4,
//       "quote": "You gain strength, courage and confidence by every experience in which you really stop to look fear in the face. You are able to say to yourself, 'I have lived through this horror. I can take the next thing that comes along.' You must do the thing you think you cannot do.",
//       "author": "Eleanor Roosevelt"
//     },
//     {
//       "id": 5,
//       "quote": "We had better not enjoy the moment, but create the moment.",
//       "author": "Ai Weiwei"
//     },
//     {
//       "id": 6,
//       "quote": "If I didn't define myself for myself, I would be crunched into other people's fantasies for me and eaten alive.",
//       "author": "Audre Lorde"
//     },
//     {
//       "id": 7,
//       "quote": "Our greatest glory is not in never falling, but in rising everytime we fall.",
//       "author": "Confucius"
//     },
//     {
//       "id": 8,
//       "quote": "Don't count the days, make the days count.",
//       "author": "Muhammad Ali"
//     },
//     {
//       "id": 9,
//       "quote": "Not everything that is faced can be changed, but nothing can be changed until it is faced.",
//       "author": "James Baldwin"
//     },
//     {
//       "id": 10,
//       "quote": "You know, failure hurts. Any kind of failure stings. If you live in the sting, you will undoubtedly fail. My way of getting past the sting is to say no, I’m just not going to let this get me down.",
//       "author": "Sonia Sotomayor"
//     },
//     {
//       "id": 11,
//       "quote": "The here and now is all we have, and if we play it right it's all we'll need.",
//       "author": "Ann Richards"
//     }
//   ]
// }









