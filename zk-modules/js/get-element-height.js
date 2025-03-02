// Необходимые для работы сущности:

// Указанные ниже CSS-классы назначаются программистом.
// data-geh01-id

// Указанные ниже CSS-свойства назначается скриптом.
// --geh01--<id>

// ---------------------------------------------------------------------

const GEHs = document.querySelectorAll('*[data-geh01-id]');
GEHs.forEach(geh => {
    const ID = geh.dataset.geh01Id;

    updateData();
    const RESIZE_OBSERVER = new ResizeObserver(() => {
        updateData();
    });
    RESIZE_OBSERVER.observe(geh);

    // ---------------------------------------------------------------------

    function updateData() {
        let height = geh.getBoundingClientRect().height;
        
        document.body.style.setProperty('--geh01--' + ID, height + 'px');
    }
    
});
