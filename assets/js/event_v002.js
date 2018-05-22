$(function()
{
    var getCookie = function(strName)
    {
        var strNameEQ = strName + "=" ;
        var ca = document.cookie.split(';') ;

        for(var i=0; i < ca.length; i++)
        {
            var c = ca[i] ;
            c = c.replace(/^\s+/, '') ;

            if (c.indexOf(strNameEQ) == 0)
            {
                return c.substring(strNameEQ.length, c.length) ;
            }
        }

        return null;
    }

    var getParameterByName = function(strName, strUrl)
    {
        if (!strUrl)
        {
            return null ;
        }

        strName = strName.replace(/[\[\]]/g, "\\$&");

        var regex    = new RegExp("[?&]" + strName + "(=([^&#]*)|&|#|$)") ;
        var arrMatch = regex.exec(strUrl) ;

        if (!arrMatch)
        {
            return null ;
        }

        return !arrMatch[2] ? '' : decodeURIComponent(arrMatch[2].replace(/\+/g, " ")) ;
    }

    var strRedirect = $.trim(getParameterByName('redirect', window.location.toString())) ;

    window.history.pushState({}, '', window.location.origin + window.location.pathname) ;

    $(document)
        .on('click', '.btn_box .activateCard', function(e)
        {
            var _this = $(this) ;

            var _dfdLogin  = $.Deferred() ;

            if (strRedirect != '1')
            {
                $.getJSON('//ecapi.pchome.com.tw/member/v2/member/islogin?_callback=?')
                    .done(function(isLogin)
                    {
                        if (isLogin != 1)
                        {
                            _dfdLogin.reject() ;

                            location.href = 'https://ecvip.pchome.com.tw/login/v2/login.htm?rurl='+encodeURIComponent(window.location.toString() + '?redirect=1') ;
                        }
                        else
                        {
                            // 已登入導到花旗
                            $('#sendto').modal({backdrop: 'static', keyboard: false}) ;
                            _dfdLogin.resolve() ;
                        }
                    })
                    .fail(function()
                    {
                        _dfdLogin.reject() ;

                        location.href = 'https://ecvip.pchome.com.tw/login/v2/login.htm?rurl='+encodeURIComponent(window.location.toString() + '?redirect=1') ;
                    }) ;
            }
            else
            {
                _dfdLogin.resolve() ;
            }

            _dfdLogin
                .done(function()
                {
                    var strMemberId  = $.trim(getCookie('MBR')) ;

                    if ($(".header_mobile .arrow:visible").length == 0) // pc
                    {
                        var isAllow = $('.main_content .agree').find('input[type="checkbox"]').prop('checked') ? 1 : 0 ;
                    }
                    else // Mobile
                    {
                        var isAllow = $('#applyCard .agree').find('input[type="checkbox"]').prop('checked') ? 1 : 0 ;
                    }

                    try
                    {
                        $.ajax({
                             url : '//ecapi.pchome.com.tw/cobrand/v1/citi/apply?cusid=' + strMemberId
                            ,type : 'POST'
                            ,data : JSON.stringify({isAllow:isAllow})
                            ,xhrFields: {withCredentials:true}
                        })
                        .done(function(objData)
                        {
                            if (typeof objData.ProspectId != 'undefined' && objData.ProspectId != '')
                            {
                                $('input[name="prospect_id"]').val(objData.ProspectId) ;
                                $('input[name="time"]').val(objData.Time) ;
                                $('input[name="hash"]').val(objData.Hash) ;
                                $('#postCiti').click() ;
                            }
                            else
                            {
                                location.href = 'https://www.citibank.com.tw/credit-cards/application/index.html?CardType=15&Media=381' ;
                            }
                        })
                        .fail(function(XHR)
                        {
                            if (XHR.status == 403)
                            {
                                location.href = 'https://www.citibank.com.tw/credit-cards/application/index.html?CardType=15&Media=381' ;
                            }
                            else
                            {
                                if ($.trim(XHR.responseText) != '')
                                {
                                    var objMsg = JSON.parse(XHR.responseText) ;
                                    switch(objMsg.Code)
                                    {
                                        case '400-002':
                                            alert('申請中，請稍後') ;
                                        break ;

                                        default:
                                            location.href = 'https://www.citibank.com.tw/credit-cards/application/index.html?CardType=15&Media=381' ;
                                        break ;
                                    }
                                }
                                else
                                {
                                    location.href = 'https://www.citibank.com.tw/credit-cards/application/index.html?CardType=15&Media=381' ;
                                }
                            }
                        }) ;
                    }
                    catch (err)
                    {
                        location.href = 'https://www.citibank.com.tw/credit-cards/application/index.html?CardType=15&Media=381' ;
                    }
                }) ;
        }) ;
}) ;