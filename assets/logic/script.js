$(document).ready(() => {
    var screen = $(window);
    
    const check = () => {
        if (screen.width() < 600) {
            $('.current-day').removeClass('bg-primary').addClass('bg-dark');
        };
        
        if (screen.width() > 600) {
            $('.current-day').removeClass('bg-dark').addClass('bg-primary');
        }
    };

    check();
    console.log('script ready!')
     
    screen.resize(() => {
        check();
    });

    

    const citiesList = ['New York', 'Seattle', 'Washington, D.C.', 'Queretaro'];

});