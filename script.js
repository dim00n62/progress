var progress = document.getElementById('progress');

let left = document.getElementById('left');
let right = document.getElementById('right');
let circle = document.getElementById('circle');

progress.setMod = function(prop = '', value = '') {
    if (prop === 'animated') {
        if (value === 'yes') {
            animated(true);
            document.getElementById('anim').checked = true;
            
        } else {
            animated(false);
            document.getElementById('anim').checked = false;
        }
    }

    if (prop === 'hide') {
        if (value === 'yes') {
            hide(true);
            document.getElementById('hid').checked = true;
        } else {
            hide(false);
            document.getElementById('hid').checked = false;
        }
    }
}

progress.setValue = function(value = 0) {
    if (value < 0 || value > 100) {
        // Неверное значение
        return -1;
    }
    setValue(value);
    document.getElementById('val').value = value;
}

var prevValue = 0;
// Создаем элементы в DOM
progress.outerHTML = `
<div id="progress">
    <div id="circle" class="progress__circle">
        <div class="left-block">
            <div class="left-block__element" id="left"></div>
        </div>
        <div class="right-block">
            <div class="right-block__element" id="right"></div>
        </div>
        <div class="progress__center"></div>
    </div>
    <div class="progress__control">
        <div class="row">
            <input id="val" class="row__val" onchange="setValue(+this.value)" value="0"><span>Value</span>
        </div>
        <div class="row">
            <label class="row__switch">
                <input type="checkbox" id="anim" onchange="animated(this.checked)">
                <span class="slider round"></span>
            </label>
            <span>Animate</span>
        </div>
        <div class="row">
            <label class="row__switch">
                <input type="checkbox" id="hid" onchange="hide(this.checked)">
                <span class="slider round"></span>
            </label>
            <span>Hide</span>
        </div>
    </div>
</div>`;

function setValue(value) {
    if (value <= 50 && value >= 0) {
        if (this.prevValue > 50) {
            // Рассчитываем пропорциональные задержки исходя из пропорциональности значений, коэффициент больше там, где больша задержка, получается анимация без рывков
            this.right.style.transition = (50 - value)/(this.prevValue - value) + 's ease-out';
            this.left.style.transition = (this.prevValue - 50)/(this.prevValue - value) + 's ease-in';
            this.left.style.transform = 'rotate(0deg)';
            // Задержка анимации правой части на время левой
            setTimeout(() => {this.right.style.transform = 'rotate(' + (value*3.6).toString() + 'deg)'}, 1000*(this.prevValue - 50)/(this.prevValue - value));
        } else {
            this.right.style.transform = 'rotate(' + (value*3.6).toString() + 'deg)';
        }

        this.prevValue = value;
        return ;
    }

    if (value > 50 && value <= 100) {
        if (this.prevValue <= 50) {
            // Рассчитываем пропорциональные задержки исходя из пропорциональности значений, коэффициент больше там, где больша задержка, получается анимация без рывков
            this.right.style.transition = (50 - this.prevValue)/(value - this.prevValue) + 's ease-in';
            this.left.style.transition = (value - 50)/(value - this.prevValue) + 's ease-out';
            this.right.style.transform = 'rotate(180deg)';
            // Задержка анимации левой части на время правой
            setTimeout(() => {this.left.style.transform = 'rotate(' + ((value - 50)*3.6).toString() + 'deg)'}, 1000*(50 - this.prevValue)/(value - this.prevValue));
        } else {
            this.left.style.transform = 'rotate(' + ((value - 50)*3.6).toString() + 'deg)';
        }
        
        this.prevValue = value;
        return ;
    }
}

function hide(val) {
    if (val) {
        this.circle.style.opacity = 0;
    } else {
        this.circle.style.opacity = 1;
    }
};

function animated(val) {
    if (val) {
        this.circle.classList.add('progress__circle--rotating');
    } else {
        this.circle.classList.remove('progress__circle--rotating');
    }
}
