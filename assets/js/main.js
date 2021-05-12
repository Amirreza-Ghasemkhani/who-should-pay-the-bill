let hero = new findHero;

function findHero() {
    this.applicants = [];

    this.init = () => {
        this.addApplicants()
        this.getRandomUser()
        this.runAgain()
        this.startAgainBtn()
    }

    this.showList = () => {
        const parent = document.querySelector('.applicant_list_wrapper');

        let template = '';


        this.applicants.forEach((person) => {
            let name = person.toUpperCase()
            template += `<div class="col-2 d-flex flex-column tag-name">
                <img src="https://avatars.dicebear.com/api/gridy/${person}.svg" alt="${person}" height="125px">
                <span class="rounded p-1 text-wrap w-100">${name}</span>      
                </div>`
        })

        parent.innerHTML = '';

        parent.insertAdjacentHTML('afterbegin', template)

        this.deleteOne()
    }

    this.addApplicants = () => {
        let $this = this;

        const generateList = input => {
            let value = input.value

            if ($this.checkValidate(value.toUpperCase())) {
                $this.applicants.push(value.toUpperCase());
                input.value = '';
                $this.showList()
            } else {
                alert('Something is wrong')
            }
        }

        const nameInput = document.querySelector('#applicant_value')
        nameInput.addEventListener('keypress', (e) => {
            if (e.keyCode === 13) {
                generateList(nameInput)
                $this.showList()
                $this.removeAll()
            }
        })

        const addBtn = document.querySelector('#add_applicant')
        addBtn.addEventListener('click', () => {
            generateList(nameInput)
            $this.showList()
            $this.removeAll()
        })

    }

    this.checkValidate = value => {
        return (this.applicants.indexOf(value) < 0 && value !== '')
    }

    this.deleteOne = () => {
        const items = document.querySelectorAll('.tag-name')

        let removeIt = element => {
            this.applicants.splice(this.applicants.indexOf(element.innerText), 1)
            this.showList()
        }

        items.forEach(item => {
            item.addEventListener('click', () => {
                removeIt(this)
                this.removeAll()
            })
        })
    }

    this.removeAll = () => {
        const allItemRemove = document.querySelector('.remove-all-applicants');
        const tapToRemoveItem = document.querySelector(".tapToRemove");

        if(this.applicants.length > 1){
            allItemRemove.style.display = 'block'
        } else {
            allItemRemove.style.display = 'none'
        }

        if(this.applicants.length > 0){
            tapToRemoveItem.style.display = 'block'
        } else {
            tapToRemoveItem.style.display = 'none';
        }


        allItemRemove.addEventListener('click', () => {
            this.applicants.splice(0, this.applicants.length);
            this.showList()
            allItemRemove.style.display = 'none'
            tapToRemoveItem.style.display = 'none'
        })
    }

    this.getRandomUser = () => {
        let $this = this;

        const showHero = () => {
            let applicantContainer = document.querySelector('.applicant_container');
            let resultsAction = document.querySelector('.showResultContainer');
            let timeContainer = document.querySelector('#timer-container');
            let pageContainer = document.querySelector('#pageContainer');

            pageContainer.style.display = 'none'
            timeContainer.className = 'timer d-flex justify-content-center align-items-center w-100 h-100'

            this.startTimer(8, () => {
                pageContainer.style.display = 'block';
                timeContainer.className = 'timer d-none'
                applicantContainer.style.display = 'none';
                resultsAction.className = 'results_container';
                $this.showRandomHero()
            })
        }

        const looserBtn = document.querySelector('#show_results');
        looserBtn.addEventListener('click', () => {
            if ($this.applicants.length > 1) {
                document.querySelector('#joke').innerText = ""
                fetch('https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit&type=single')
                    .then(response => response.json()).then(data => document.querySelector('#joke').innerText = data.joke)
                showHero()
            } else {
                alert('Need More Person')
            }
        })
    }

    this.showRandomHero = () => {
        let resultHero = document.querySelector('.result');
        let rand = this.applicants[Math.floor(Math.random() * this.applicants.length)]

        resultHero.innerHTML = '';
        resultHero.insertAdjacentHTML('afterbegin', `<h3>${rand}</h3>`)
    }

    this.runAgain = () => {
        let $this = this;
        const runAgn = document.querySelector('.run_again');

        runAgn.addEventListener('click', (e) => {
            let timeContainer = document.querySelector('#timer-container');
            let timer = document.querySelector('#timerId');
            let pageContainer = document.querySelector('#pageContainer');

            pageContainer.style.display = 'none'
            timeContainer.className = 'timer d-flex justify-content-center align-items-center w-100 h-100'

            this.startTimer(8, () => {
                pageContainer.style.display = 'block';
                timeContainer.className = 'timer d-none'
                $this.showRandomHero()
            })
            document.querySelector('#joke').innerText = ""
            fetch('https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit&type=single')
                .then(response => response.json()).then(data => document.querySelector('#joke').innerText = data.joke)
        })
    }

    this.startAgainBtn = () => {
        let $this = this;

        const startBtn = document.querySelector('.start_again');

        startBtn.addEventListener('click', function (e) {
            let applicantContainer = document.querySelector('.applicant_container');
            let resultsAction = document.querySelector('.results_container');
            let resetItems = document.querySelector('.applicant_list_wrapper');
            let removeAllElements = document.querySelector('.remove-all-applicants');
            let tapToRemove = document.querySelector(".tapToRemove");

            applicantContainer.style.display = 'block';
            resultsAction.className = 'showResultContainer d-none'
            resetItems.innerHTML = '';
            removeAllElements.style.display = 'none'
            tapToRemove.classList.add('d-none')
            $this.applicants = []
        })
    }

    this.startTimer = (time, finished) => {
        let timer = document.querySelector('#timerId');
        timer.innerHTML = ""
        let loop = setInterval(() => {
            if (time === 0) {
                clearInterval(loop)
                finished();
            }
            time--;
            timer.innerHTML = time;
        }, 1000);
    }
}

hero.init()

let eyeBall = document.querySelector(".eyeball"),
    pupil = document.querySelector(".pupil"),
    eyeArea = eyeBall.getBoundingClientRect(),
    pupilArea = pupil.getBoundingClientRect(),
    R = eyeArea.width / 2,
    r = pupilArea.width / 2,
    centerX = eyeArea.left + R,
    centerY = eyeArea.top + R;

document.addEventListener("mousemove", (e) => {
    let x = e.clientX - centerX,
        y = e.clientY - centerY,
        theta = Math.atan2(y, x),
        angle = theta * 180 / Math.PI + 360;


    pupil.style.transform = `translateX(${R - r + "px"}) rotate(${angle + "deg"})`;
    pupil.style.transformOrigin = `${r + "px"} center`;
});