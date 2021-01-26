const btnstart = document.getElementById('start')
//holes為陣列，叫出每個格子用holds[n]
const rabit_text = document.querySelector('.rabit_text')
const holes = document.querySelectorAll('.holes')
const textscore = document.getElementById('text-score')
//本地暫存資料設定
const texthighplayer = document.getElementById('text-highplayer')
const texthighscore = document.getElementById('text-highscore')

// 聲音撥放
// const rihai = document.getElementById('rihai')

// 分數與狀態
let score = 0
let isingame = false

// 初始設定
let highscore = { name: '', score: 0 }
//綁定網頁與在地暫存庫的資料
//JSON.parse() 方法把會把一個JSON字串轉換成 JavaScript的數值或是物件
const highscorestorage = JSON.parse(localStorage.getItem('highscore'))
if (highscorestorage !== null) {
    highscore = highscorestorage
    texthighplayer.innerText = highscore.name
    texthighscore.innerText = highscore.score
}

// JSON.parse()
// JSON.stringify
// localStorage.getItem

btnstart.onclick = () => {
    btnstart.classList.add('noshow')
    rabit_text.classList.add('noshow')

    btnstart.disabled = true
    score = 0
    textscore.innerText = score

    isingame = true

    timer = setInterval(game, 3000)
    setTimeout(end, 10000)

    game()
}

const game = () => {
    for (const hole of holes) {
        hole.classList.remove('red')
        hole.classList.remove('blue')
        hole.classList.remove('other')
        hole.classList.remove('other_wrong')
    }
    for (let i = 0; i < 4; i++) {
        const random = Math.floor(Math.random() * 9)
        holes[random].classList.add('red')
        if (random !== 7) {
            const otheradd = random + 2
            holes[otheradd].classList.add('other')
        }
    }
}

const end = () => {
    clearInterval(timer)
    for (const hole of holes) {
        hole.classList.remove('red')
        hole.classList.remove('blue')
        hole.classList.remove('other')
        hole.classList.remove('other_wrong')
    }

    btnstart.disabled = false
    alert(`你的分數是${score}`)
    btnstart.classList.add('show')
    rabit_text.classList.add('show')

    if (highscorestorage === null || highscore.score < score) {
        rihai.play()
        const name = prompt('最高分請輸入名字')
        highscore.score = score
        highscore.name = name || '路人'

        //   更新暫存資料
        //   這個動作就叫 JSON Stringify（字串化）,將 JSON 物件（Object）轉成字串後，才能儲存或傳送。
        localStorage.setItem('highscore', JSON.stringify(highscore))
        texthighplayer.innerText = highscore.name
        texthighscore.innerText = highscore.score
    }
}

for (const hole of holes) {
    hole.onclick = () => {
        if (hole.classList.contains('red')) {
            hole.classList.remove('red')
            hole.classList.add('blue')

            score++
            textscore.innerText = score
        }
        if (hole.classList.contains('other')) {
            hole.classList.remove('other')
            hole.classList.add('other_wrong')

            score--
            textscore.innerText = score
        }
    }
}
