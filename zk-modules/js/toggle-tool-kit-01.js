// Необходимые для работы сущности:

// data-ttk01           : id/str            - элемент настройки группы переключателя.
// data-ttk01-flag      : bool (read only)  - флаг группы.
// data-ttk01-max-width : int (опционально) - установка флага в false, если ширина окна больше указанной.

// data-ttk01-flag-<id/str> : bool (read only) - флаг группы.

// data-ttk01-button-<id/str>      - кнопка смены флага.
// data-ttk01-area-button-<id/str> - облостная кнопка смены флага.

// ---------------------------------------------------------------------

class ToggleChange extends Event {
    constructor(flag) {
        if (typeof flag !== 'boolean')  throw new Error('');

        super('change');

        this.data = {
            flag
        };
    }
}

class Toggle extends EventTarget {
    constructor(flag) {
        if (typeof flag !== 'boolean')  throw new Error('');

        super();

        this.setFlag(flag);
    }

    setFlag(flag) {
        this.__flag = flag;

        this.dispatchEvent(new ToggleChange(
            this.__flag
        ));
    }

    toggle() {
        this.setFlag(!this.__flag);
    }
}

// ---------------------------------------------------------------------

const TTKs = document.querySelectorAll('*[data-ttk01]');
TTKs.forEach(ttk => {
    const ID = ttk.dataset.ttk01;

    const TOGGLE = new Toggle(false);

    // ---------------------------------------------------------------------

    const FLAGs = document.querySelectorAll('*[data-ttk01-flag-' + ID + ']')

    TOGGLE.addEventListener('change', event => {
        FLAGs.forEach(element => {

            element.setAttribute('data-ttk01-flag-' + ID, event.data.flag);

        });

        ttk.dataset.ttk01Flag = event.data.flag;
    });

    // ---------------------------------------------------------------------

    (()=>{
        if (!ttk.dataset.ttk01MaxWidth) return

        const MAX_WIDTH = +ttk.dataset.ttk01MaxWidth;

        window.addEventListener('resize', () => {
            if (window.innerWidth <= MAX_WIDTH) return;
    
            TOGGLE.setFlag(false);
        });
    })();

    // ---------------------------------------------------------------------

    const BUTTONs = document.querySelectorAll('*[data-ttk01-button-' + ID + ']');
    BUTTONs.forEach(button => {
        button.addEventListener('click', () => {
            TOGGLE.toggle();
        });
    });

    // ---------------------------------------------------------------------

    const AREA_BUTTONs = document.querySelectorAll('*[data-ttk01-area-button-' + ID + ']');
    AREA_BUTTONs.forEach(button => {
        button.addEventListener('click', event => {
            if (event.target !== event.currentTarget) return;

            TOGGLE.toggle();
        });
    });

    // ---------------------------------------------------------------------

    TOGGLE.setFlag(false);

});
