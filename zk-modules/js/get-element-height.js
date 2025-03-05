// Необходимые для работы сущности:

// data-geh01        : id/str          - элемент, чей размер отслеживается.
// --geh01--<id/str> : int (read only) - размер элемента под указанным id. Пишется в body.

// ---------------------------------------------------------------------

const GEHs = document.querySelectorAll('*[data-geh01]');
GEHs.forEach(geh => {
    const ID = geh.dataset.geh01;

    // ---------------------------------------------------------------------

    function updateData() {
        let height = geh.getBoundingClientRect().height;
        
        document.body.style.setProperty('--geh01--' + ID, height + 'px');
    }

    // ---------------------------------------------------------------------

    updateData();
    const RESIZE_OBSERVER = new ResizeObserver(() => {
        updateData();
    });
    RESIZE_OBSERVER.observe(geh);
    
});
