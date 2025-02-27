// Необходимые для работы сущности:

// Указанные ниже CSS-свойства назначается скриптом.
// --gnh01--nav-height

// ---------------------------------------------------------------------

function updateData() {
    let height = GNH.getBoundingClientRect().height;
    
    document.body.style.setProperty("--gnh01--nav-height", height + 'px');
}

// ---------------------------------------------------------------------

const GNH = document.querySelector('nav');
(()=>{
    if (GNH === null) return;

    updateData();
    window.addEventListener('resize', () => {
        updateData();
    });
    
})();
