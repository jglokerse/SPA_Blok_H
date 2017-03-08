/**
 * Created by John on 13/02/2017.
 */

document.getElementById('rotate').addEventListener('click', function () {
    $('.container').transition({rotate: '180deg'}, 1000);

    setTimeout(function () {
        $('.container').transition({rotate: '360deg'}, 1000);
    }, 3000);
});