import { animateScroll } from 'react-scroll'

export const ScrollToBottom = ( id ) => {
 
    setTimeout( () => {
        animateScroll.scrollToBottom({
            containerId: id,
            duration:    0,
            delay:       0,
            smooth:     true,
            isDynamic:  true,
            offset:     -100,
        });
    }, 10);

}

export const ScrollToBottomAnimated = (id) => {
    setTimeout( () => {
        animateScroll.scrollToBottom({
            containerId: id,
            duration:   500,
            delay:      0,
            smooth:     true,
            isDynamic:  true,
            offset:     -100,
        });
    }, 10);

}
