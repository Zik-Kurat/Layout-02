// Необходимые для работы сущности:

// Указанные ниже CSS-классы назначаются программистом.
// .ttk01

// Указанные ниже HTML-атрибуты назначается программистом.
// data-ttk01-id
// data-ttk01-max-width
// data-ttk01-method-<id>-<method>

// <method>:
// observer
// button
// area-button

// Указанные ниже HTML-атрибуты назначается скриптом.
// data-ttk01-<id>-flag

// ---------------------------------------------------------------------

const TTKs = document.querySelectorAll('.ttk01');
TTKs.forEach(ttk => {
    const ID = ttk.dataset.ttk01Id;
    const MAX_WIDTH = +ttk.dataset.ttk01MaxWidth;

    const OBSERVERs    = document.querySelectorAll('*[data-ttk01-method-' + ID + '-observer]');
    const BUTTONs      = document.querySelectorAll('*[data-ttk01-method-' + ID + '-button]');
    const AREA_BUTTONs = document.querySelectorAll('*[data-ttk01-method-' + ID + '-area-button]');

    let flag = false;
    setFlag(flag);

    // ---------------------------------------------------------------------

    function setFlag(flag) {
        OBSERVERs.forEach(element => {
            element.setAttribute(
                'data-ttk01-' + ID + '-flag',
                flag
            );
        });
    }

    // ---------------------------------------------------------------------

    window.addEventListener('resize', () => {
        if (window.innerWidth <= MAX_WIDTH) return;

        flag = false;
        setFlag(flag);
    });

    // ---------------------------------------------------------------------

    BUTTONs.forEach(button => {
        button.addEventListener('click', () => {
            flag = !flag;
            setFlag(flag);
        });
    });
    AREA_BUTTONs.forEach(button => {
        button.addEventListener('click', event => {
            if (event.target !== event.currentTarget) return;

            flag = !flag;
            setFlag(flag);
        });
    });

});
