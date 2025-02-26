// Необходимые для работы сущности:

// Указанные ниже CSS-классы назначаются программистом.
// .ttk01
// .ttk01--button
// .ttk01--area-button

// Указанные ниже HTML-атрибуты назначается программистом.
// data-ttk01-group
// data-ttk01-max-width

// Указанные ниже HTML-атрибуты назначается скриптом.
// data-ttk01-flag

// ---------------------------------------------------------------------

const TTKs = document.querySelectorAll('.ttk01');
TTKs.forEach(ttk => {
    const GROUP_NAME = ttk.dataset.ttk01Group;
    const MAX_WIDTH = +ttk.dataset.ttk01MaxWidth;

    const ALL          = document.querySelectorAll('*[data-ttk01-group="'                   + GROUP_NAME + '"]');
    const BUTTONs      = document.querySelectorAll('.ttk01--button[data-ttk01-group="'      + GROUP_NAME + '"]');
    const AREA_BUTTONs = document.querySelectorAll('.ttk01--area-button[data-ttk01-group="' + GROUP_NAME + '"]');

    let flag = false;
    setFlag(flag);

    // ---------------------------------------------------------------------

    function setFlag(flag) {
        ALL.forEach(element => {
            element.dataset.ttk01Flag = flag;
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
