function ajax (url, data, sfn) {
    $.ajax({
        'type': 'GET',
        'url': url,
        'data': data,
        'cache': false,
        'dataType': 'html',
        'async' : true,
        success : function (data) {
            data = eval('(' + data + ')');
            sfn(data);
        },
        error : function (e) {
            console.log('Network error!')
            efn(e);
        }
    });
}

ajax('data/collection.json', {}, function(data) {
    $('.Navbar>li[data-id="collection"]>.tag').html(data.length);
    for (let i=0,len=data.length; i < len; i++) { 
        $('.Vary-item.collection>ul').append('<li><a href="' + data[i].link + '" data-tag="'+data[i].tag+'" target="_blank">'+data[i].name+'</a></li>');
    }
})

ajax('data/nicetool.json', {}, function(data) {
    $('.Navbar>li[data-id="app"]>.tag').html(data.length * 12);
    r = [];
    for (let i=0,len=data.length; i < len; i++) {
        for (let i2=0,len2=data[i].msg.length; i2 < len2; i2++) { 
            r.push(data[i].msg[i2])
        }
    }
    console.log(JSON.stringify(r))
})

if (location.href.substr(0, 5) == 'https') {
    $('.PageFooter .https').html('已启用安全的HTTPS');
    $('.PageFooter .https').css('color', 'green')
} else {
    $('.PageFooter .https').parent().attr('href', 'https' + location.href.substring(4));
}

//creatModal('输入密钥', '<p>用于某些加密数据的密钥：</p><input type="text" class="b" />', 300, 'auto', '<button class="primary btn">确定</button><button class="btn close">取消</button>');


var modalId = 2;
function creatModal(title, body, w = 500, h = 300, foot = '', auto) {
    var left = $(document).width() / 2 - w / 2,
        top = $(document).height() / 2 - h / 2;
    $('body').append('<div class="Modal Modal'+modalId+'" style="width:'+w+'px;height:'+h+'px;top:'+top+'px;left:'+left+'px;"><div class="close">×</div><div class="Modal-head fontA">' + title + '</div><div class="Modal-body">' + body + '</div><div class="Modal-foot">' + foot + '</div></div>');
    modalId++;
}


$('.Navbar>li').click(function() {
    $('.Navbar>li').removeClass('active');
    $(this).addClass('active');
    $('.Vary-item').removeClass('active');
    $('.Vary-item.' + $(this).attr('data-id')).addClass('active');
});

$(document).on('mousedown', '.Modal>.Modal-head', function(e) {
    var d = $(this).parent(),
        offsetX = e.offsetX,
        offsetY = e.offsetY,
        x = e.pageX,
        y = e.pageY

    $('.Modal').removeClass('active');
    d.addClass('mousedown');
    d.addClass('active');

    $(document).on('mousemove', function(e2) {
        d.css({
            left: d.offset().left + e2.pageX - x,
            top: d.offset().top + e2.pageY - y
        });
        x = e2.pageX;
        y = e2.pageY;
    });

});

$(document).on('mouseup', '.Modal>.Modal-head', function() {
    var d = $(this).parent();
    d.removeClass('mousedown');
    $(document).unbind('mousemove');
});

$(document).on('click', '.Modal .close', function() {
    var d = $(this).parent();
    if (d.hasClass('Modal')) {
        d.remove();
    } else {
        d.parent().remove();
    }
    
});

// mouseup
