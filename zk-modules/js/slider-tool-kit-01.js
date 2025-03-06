// Необходимые для работы сущности:

// data-stk01                                    - корень слайдера.
// data-stk01-total          : int               - количество слайдов.
// data-stk01-delay          : sec (опционально) - задержка для автопереключения.
// --stk01--num-active-slide : int (read only)   - номер активного слайда.

// data-stk01-button-to-backward - кнопка шага назад.
// data-stk01-button-to-forward  - кнопка шага вперед.

// data-stk01-button-toggle : int     - кнопка переключаения на конкретный слайд.
// data-stk01-flag : bool (read only) - флаг активности ассоциированного слайда.

// data-stk01-observer : int              - наблюдатель, отслеживающий ассоциированный слайда.
// data-stk01-flag     : bool (read only) - флаг активности ассоциированного слайда.

// ---------------------------------------------------------------------

function delay(func, sec) {
    let id = setTimeout(func, sec);

    return () => {
        clearTimeout(id);
        id = setTimeout(func, sec);
    };
}

// ---------------------------------------------------------------------

// [startPoing; endPoint)
class Ring {
    constructor(startPoing, endPoint, cursorPoint) {
        if (typeof startPoing !== 'number')  throw new Error('');
        if (typeof endPoint !== 'number')    throw new Error('');
        if (typeof cursorPoint !== 'number') throw new Error('');

        if (startPoing > endPoint) throw new Error('');
        if (endPoint - startPoing === 0) throw new Error('');

        this.__dx = startPoing;
        this.__width = endPoint - startPoing;
        this.__cursorPoint = null;

        this.setCursor(cursorPoint);
    }

    setCursor(point) {
        if (typeof point !== 'number') throw new Error('');

        let normalizePoint = point - this.__dx;

        this.__cursorPoint = normalizePoint - Math.floor(normalizePoint / this.__width) * this.__width;

        return this.getCursor();
    }

    getCursor() {
        return this.__dx + this.__cursorPoint;
    }

    step(delta) {
        if (typeof delta !== 'number') throw new Error('');

        return this.setCursor(this.getCursor() + delta);

    }
}

// ---------------------------------------------------------------------

class SliderChangeStateEvent extends Event {
    constructor(oldActiveSlide, newActiveSlide) {
        if (typeof oldActiveSlide !== 'number')  throw new Error('');
        if (typeof newActiveSlide !== 'number')  throw new Error('');

        super('change');

        this.data = {
            oldActiveSlide,
            newActiveSlide
        };
    }
}

class SliderState extends EventTarget {
    constructor(activeSlide, totalSlide) {
        if (typeof activeSlide !== 'number') throw new Error('');

        super();

        this.__sliderRing = new Ring(0, totalSlide, activeSlide);
    }

    getActiveSlide() {
        return this.__sliderRing.getCursor();
    }

    setActiveSlide(slide) {
        if (typeof slide !== 'number') throw new Error('');

        let oldActiveSlide = this.__sliderRing.getCursor();
        let newActiveSlide = this.__sliderRing.setCursor(slide);

        this.dispatchEvent(new SliderChangeStateEvent(
            oldActiveSlide,
            newActiveSlide
        ));
    }

    goToActiveSlide(delta) {
        if (typeof delta !== 'number') throw new Error('');

        let oldActiveSlide = this.__sliderRing.getCursor();
        let newActiveSlide = this.__sliderRing.step(delta);

        this.dispatchEvent(new SliderChangeStateEvent(
            oldActiveSlide,
            newActiveSlide
        ));
    }
}

// ---------------------------------------------------------------------

const STKs = document.querySelectorAll('*[data-stk01]');
STKs.forEach(stk => {

    const TOTAL = stk.dataset.stk01Total ? +stk.dataset.stk01Total : 0;
    if (isNaN(TOTAL)) throw new Error('');
    if (TOTAL < 0)   throw new Error('');

    const SLIDER_STATE = new SliderState(0, TOTAL);

    SLIDER_STATE.addEventListener('change', event => {
        stk.style.setProperty('--stk01--num-active-slide', event.data.newActiveSlide);
    });

    // ---------------------------------------------------------------------

    (()=>{
        if (!stk.dataset.stk01Delay) return

        const DELAY = +stk.dataset.stk01Delay;
        if (isNaN(DELAY)) throw new Error('');
        if (DELAY < 0)   throw new Error('');

        const RESET_FUNC = delay(() => {
            SLIDER_STATE.goToActiveSlide(1);
        }, DELAY * 1000);
    
        SLIDER_STATE.addEventListener('change', event => {
            RESET_FUNC();
        });
    })();

    // ---------------------------------------------------------------------

    const OBSERVERs = stk.querySelectorAll('*[data-stk01-observer]');
    OBSERVERs.forEach(element => {

        const NUM = +element.dataset.stk01Observer;
        if (isNaN(NUM)) throw new Error('');
        if (NUM < 0)   throw new Error('');

        SLIDER_STATE.addEventListener('change', event => {
            element.dataset.stk01Flag = NUM === event.data.newActiveSlide;
        });
    });

    // ---------------------------------------------------------------------

    const BUTTONs_BACKWARD = stk.querySelectorAll('*[data-stk01-button-to-backward]');
    BUTTONs_BACKWARD.forEach(button => {
        button.addEventListener('click', () => {
            SLIDER_STATE.goToActiveSlide(-1);
        });
    });

    const BUTTONs_FORWARD  = stk.querySelectorAll('*[data-stk01-button-to-forward]');
    BUTTONs_FORWARD.forEach(button => {
        button.addEventListener('click', () => {
            SLIDER_STATE.goToActiveSlide(1);
        });
    });

    // ---------------------------------------------------------------------

    const BUTTONs_TOGGLE = stk.querySelectorAll('*[data-stk01-button-toggle]');
    BUTTONs_TOGGLE.forEach(button => {

        const NUM = +button.dataset.stk01ButtonToggle;
        if (isNaN(NUM)) throw new Error('');
        if (NUM < 0)   throw new Error('');

        button.addEventListener('click', () => {
            SLIDER_STATE.setActiveSlide(NUM);
        });

        SLIDER_STATE.addEventListener('change', event => {
            button.dataset.stk01Flag = NUM === event.data.newActiveSlide;
        });
    });

    // ---------------------------------------------------------------------
    
    SLIDER_STATE.setActiveSlide(0);
});
