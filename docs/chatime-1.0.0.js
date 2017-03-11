/**
 * @license chatime v1.5.8
 * (c) 2016-2017 toxixhl
 * License: MIT
 */

;(function ( window ) {

    'use strict';

    /**
     * Date format validation
     * 日期格式验证
     **********************************/
    var DTAE_TESTR = [
        /^(\d{1,4})$/,                                                                                             //YYYY
        /^(\d{1,4})(-|\/)([0-1][0-2])$/,                                                                           //YYYY-MM
        /^(\d{1,4})(-|\/)([0-1][0-2])\2([0-2][0-9]|[3][0-1])$/,                                                    //YYYY-MM-DD
        /^(\d{1,4})(-|\/)([0-1][0-2])\2([0-2][0-9]|[3][0-1])\s(20|21|22|23|[0-1]\d)\:([0-5][0-9])$/,               //YYYY-MM-DD hh:mm
        /^(\d{1,4})(-|\/)([0-1][0-2])\2([0-2][0-9]|[3][0-1])\s(20|21|22|23|[0-1]\d)\:([0-5][0-9])\:([0-5][0-9])$/,           //YYYY-MM-DD hh:mm:ss
        /^((20|21|22|23|[0-1]\d)\:[0-5][0-9])$/,                                                                   //hh:mm
        /^((20|21|22|23|[0-1]\d)\:[0-5][0-9])(\:[0-5][0-9])$/,                                                     //hh:mm:ss
        /^([0-1][0-2])(-|\/)([0-2][0-9]|[3][0-1])$/,                                                               //MM-DD
        /^([0-1][0-2])(-|\/)([0-2][0-9]|[3][0-1])\s(20|21|22|23|[0-1]\d)\:([0-5][0-9])$/,                          //MM-DD hh:mm
        /^([0-1][0-2])(-|\/)([0-2][0-9]|[3][0-1])\s(20|21|22|23|[0-1]\d)\:([0-5][0-9])\:([0-5][0-9])$/,                      //MM-DD hh:mm:ss
    ];

    /**
     * format the type of The date
     * 日期类型格式化
     **********************************/
    var DATE_FORMAT = [
        'YYYY',
        'YYYY(\/|-|\\s|)MM',
        'YYYY(\/|-|\\s|)MM(\/|-|\\s|)DD',
        'YYYY(\/|-|\\s|)MM(\/|-|\\s|)DD(\\s|)hh(:|\\s|)mm',
        'YYYY(\/|-|\\s|)MM(\/|-|\\s|)DD(\\s|)hh(:|\\s|)mm(:|\\s|)ss',
        'hh(:|\s|)mm',
        'hh(:|\s|)mm(:|\\s|)ss',
        'MM(\/|-|\\s|)DD',
        'MM(\/|-|\\s|)DD(\\s|)hh(:|\\s|)mm',
        'MM(\/|-|\\s|)DD(\\s|)hh(:|\\s|)mm(:|\s|)ss',
    ];

    /**
     * global configuration
     * 全局配置
     **********************************/
    var globalConfig = {
            dateSeparate: '-',
            timeSeparate: ':',
            space:        ' '
        },
        _DS          = globalConfig.dateSeparate,
        _TS          = globalConfig.timeSeparate,
        _space       = globalConfig.space,
        lang_zh      = {
            id: 1,
            now: '现在',
            lostHour: '小时前',
            lostMinute: '分钟前',
            lostSecond: '秒前',
            lostms: '毫秒前',
            today: '今天',
            yesterday: '昨天',
            theDayBefore: '前天',
            thisWeek: '星期',
            lastWeek: '上周',
            weekDes: ['一', '二', '三', '四', '五', '六', '日']
        },
        lang_en      = {
            id: 2,
            now: 'now',
            lostHour: ' hours ago',
            lostMinute: ' minutes ago',
            lostSecond: ' seconds ago',
            lostms: ' milliseconds ago',
            today: 'today',
            yesterday: 'yesterday',
            theDayBefore: 'the day before',
            thisWeek: '',
            lastWeek: 'Last',
            weekDes: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
            weekDesAbbr: ['Mon.', 'Tues.', 'Wed.', 'Thur.', 'Fri.', 'Sat.', 'Sun.']
        },
        lang         = lang_zh;

    /**
     * Determines the type of [object]
     * 判断对象的类型
     **********************************/
    function isArray( obj ) {
        return Object.prototype.toString.call( obj ) === '[object Array]';
    }

    function isDate( obj ) {
        return Object.prototype.toString.call( obj ) === '[object Date]';
    }

    function isString( obj ) {
        return Object.prototype.toString.call( obj ) === '[object String]';
    }

    function isNumber( obj ) {
        return Object.prototype.toString.call( obj ) === '[object Number]';
    }

    /**
     * Determines the delimiter
     * 确定分隔符
     **********************************/
    function configDateSeparate( typeString ) {
        var reg    = /-|\//,
            result = typeString.match( reg );
        if ( result ) {
            return typeString.match( reg ).join( '' );
        }
        else {
            return false;
        }
    }

    /**
     * Detection of a given typeString type, and return the corresponding time
     * 检测给定的字符串时间类型，并返回对应时间
     **********************************/
    function getTypeTime( typeString, timeObject ) {

        _DS            = configDateSeparate( typeString ) || '-';
        var reg        = /[ymdhms]+/gi;
        var formatDate = new getFormatDate( timeObject );

        for ( var i = 0, l = DATE_FORMAT.length; i < l; i++ ) {
            var format = new RegExp( '^' + DATE_FORMAT[ i ] + '$', 'i' );
            if ( format.test( typeString ) ) {
                return (formatDate[typeString.match( reg ).join( '' ).toLowerCase()])();
            }
        }
    }

    /**
     * Constructs a chatime function
     * 构建 chatime 函数
     **********************************/
    var chatime                      = function () {
        return new chatime.prototype.init();
    };
    chatime.prototype                = {
        init: function () {
            return this;
        }
    };
    chatime.prototype.init.prototype = chatime.prototype;

    /**
     * Get a date based on the time object
     * 根据时间对象获得日期
     **********************************/
    var getDateNumber = {

        YYYY: function ( o ) {
            return o.getFullYear().toString();
        },

        MM: function ( o ) {
            var M = o.getMonth() + 1;
            if ( M < 10 ) {
                M = '0' + M;
            }
            return M;
        },

        DD: function ( o ) {
            var D = o.getDate()
            if ( D < 10 ) {
                D = '0' + D;
            }
            return D;
        },

        hh: function ( o ) {
            var h = o.getHours()
            if ( h < 10 ) {
                h = '0' + h;
            }
            return h;
        },

        mm: function ( o ) {
            var m = o.getMinutes();
            if ( m < 10 ) {
                m = '0' + m;
            }
            ;
            return m;
        },

        ss: function ( o ) {
            var s = o.getMinutes();
            if ( s < 10 ) {
                s = '0' + s;
            }
            return s;
        }
    }

    /**
     * Get the formatted time string
     * 获得格式化的时间字符串
     **********************************/
    function getFormatDate( date ) {
        var GET = getDateNumber;

        this.yyyy = function () {
            return GET.YYYY( date );
        }

        this.yyyymm = function () {
            return this.yyyy() + _DS + GET.MM( date );
        }

        this.yyyymmdd = function () {
            return this.yyyymm() + _DS + GET.DD( date );
        }

        this.mmdd = function () {
            return GET.MM( date ) + _DS + GET.DD( date );
        }

        this.hhmm = function () {
            return GET.hh( date ) + _TS + GET.mm( date );
        }

        this.hhmmss = function () {
            return GET.hh( date ) + _TS + GET.mm( date ) + _TS + GET.ss( date );
        }

        this.yyyymmddhhmm = function () {
            return this.yyyymmdd() + _space + this.hhmm();
        }

        this.yyyymmddhhmmss = function () {
            return this.yyyymmdd() + _space + this.hhmmss();
        }

        this.mmddhhmm = function () {
            return this.mmdd() + _space + this.hhmm();
        }

        this.mmddhhmmss = function () {
            return this.mmdd() + _space + this.hhmmss();
        }
    }

    /**
     * Get the time stamp difference between two time objects
     * 获得两个时间对象的时间戳之差
     **********************************/
    function getStampDiff( start, end ) {
        //console.log( 'start=', start )
        return end.getTime() - start.getTime();
    }

    /**
     * Get the difference between the various expressions of the two temporal objects
     * such as days difference、minutes difference, etc.
     * 获得两个时间对象的各种表达方式之差
     * 例如 天数差、分钟差 等等
     **********************************/
    function getExpDiff( start, end, type ) {
        var stampDiff = getStampDiff( start, end ),
            calc = {
                year: function(){
                    return Math.floor(stampDiff / (12 * 30 * 24 * 3600 * 1000));
                },
                month: function (  ) {
                    return Math.floor(stampDiff / (      30 * 24 * 3600 * 1000));
                },
                day: function (  ) {
                    return Math.floor(stampDiff / (           24 * 3600 * 1000));
                },
                hour: function (  ) {
                    return Math.floor(stampDiff / (                3600 * 1000));
                },
                minute: function (  ) {
                    return Math.floor(stampDiff / (                  60 * 1000));
                },
                second: function (  ) {
                    return Math.floor(stampDiff / (                       1000));
                },
                millisecond: function (  ) {
                    return stampDiff;
                },
            }
        if( /^all$/.test(type) ){
            return {
                year: calc.year(),
                month: calc.month(),
                day: calc.day(),
                hour: calc.hour(),
                minute: calc.minute(),
                second: calc.second(),
                millisecond : calc.millisecond()
            }
        } else if( /^(year|month|day|hour|minute|second|millisecond)$/.test(type) ){
            return calc[type];
        }
    }

    /**
     * Get the week
     * 获得星期
     **********************************/
    var getWeek = function ( date ) {
        return lang.weekDes[date.getDay()]
    }

    /**
     * format today's chatime
     * 格式化今天的 chatime
     **********************************/
    function dayHandle( date, getFormatDateExample, dayDiff ) {
        var EXM = getFormatDateExample;
        var SPACE = globalConfig.space;
        var result =
            dayDiff === 1 ?
                (lang.yesterday + SPACE +  EXM.hhmm() ) :
                dayDiff === 2 ?
                    (lang.theDayBefore + SPACE +  EXM.hhmm() ) :
                    (dayDiff >= 3 && dayDiff < 7 ) ?
                        (( lang.id === 1 ? lang.thisWeek + getWeek(date) : getWeek(date) ) + SPACE + EXM.hhmm() ) :
                        (dayDiff >= 7 && dayDiff < 14) ?
                            (( lang.id === 1 ? lang.lastWeek + getWeek(date) : lang.lastWeek + SPACE + getWeek(date) ) + SPACE + EXM.hhmm() ) :
                            EXM.mmddhhmm();
        return result;
    }

    /**
     * Get a chat format for the time object
     * 获得一个时间对象的聊天格式
     **********************************/
    function getchatTime( date ){
        var result = '',
            diff = {},
            normalDate = new getFormatDate( date ),
            legalCheck = !!( getStampDiff( date, new Date()) >= 0 );
        if( legalCheck ){
            diff = getExpDiff( date,  new Date(), 'all' );
            result =
                diff.year !== 0 ?
                    normalDate.yyyymmddhhmm() :
                    diff.month !== 0 ?
                        normalDate.mmddhhmm() :
                        diff.day !== 0 ?
                            dayHandle( date, normalDate, diff.day ) :
                            diff.hour !== 0 ?
                            diff.hour + lang.lostHour :
                                diff.minute !== 0 ?
                                diff.minute + lang.lostMinute :
                                    diff.second !== 0 ?
                                    diff.second + lang.lostSecond :
                                        diff.millisecond !== 0 ?
                                        diff.millisecond + lang.lostms : 'now' ;
        }
        return result;
    }

    /**
     * Check the time string to determine whether it meets the format requirements
     * 检查时间字符串，判断其是否满足格式要求
     **********************************/
    function checkString( string ) {
        var test = false;
        for(var i = 0, l = DTAE_TESTR.length; i < l; i++){
            if( DTAE_TESTR[i].test(string) ){
                test = true;
            }
        }
        return test;
    }

    /**
     * Returns a time object
     * 返回一个时间对象
     **********************************/
    function getDateObject( input ) {
        //console.log( 1 )

        var _Array  = isArray( input ),
            _Number = isNumber( input ),
            _String = isString( input ),
            _Date   = isDate( input );
        //console.log( _Number )
        function DSNGetDate( dsn ) {
            if ( isDate(dsn) ) {
                return dsn;
            }
            else if ( isString(dsn) ) {
                if( checkString(dsn) ){
                    return new Date(dsn);
                }
            }
            else if( isNumber(dsn) ) {
                //console.log( 3 )
                if( /^\d{10}$/.test(dsn) ){
                    //console.log( 4 )
                    return new Date(dsn * 1000);
                } else if(/^\d{13}$/){
                    return new Date(dsn);
                }
            }
        }
        if( _Number || _String || _Date ){
            //console.log( 2 )
            return DSNGetDate(input);
        }
        else if( _Array ){
            var arr = [];
            for( var i = 0, l = input.length; i < l; i++){
                arr.push( DSNGetDate(input[i]) );
            }
            return arr;
        }
    }

    /**
     * Master method
     * 主方法
     **********************************/
    function get( option ) {

        if ( option.config ){
            set(option.config )
        }

        var timeStampTest = /^(s|ms)$/i,
            CHAT = (option.time && option.type === 'chat'),
            ARRAY = (isArray( option.time )),
            STRING = (isString( option.time )),
            NUMBER = (isNumber( option.time )),
            DATE = (isDate( option.time )),
            errorMsg = '错误的使用方式';

        if ( CHAT ){

            if ( ARRAY ){
                var dateArr = getDateObject(option.time);

                var arr = [];
                for ( var i = 0, l = dateArr.length; i < l; i++ ){
                    arr.push( getchatTime(dateArr[i]) )
                }
                lang = lang_zh;
                return arr || errorMsg;
            } else if( STRING || NUMBER ){

                console.log(1);
                var dateStr = getDateObject(option.time);
                return getchatTime(dateStr);
            }

        } else if ( option.time ) {

            if ( !option.type ) {
                return getTypeTime( 'yyyymmddhhmmss', new Date( option.time ) )　|| errorMsg;
            }

            else if ( ARRAY  ) {
                var array = [];
                for ( var i = 0, l = option.time.length; i < l; i++ ) {
                    array.push( getTypeTime( option.type, new Date( option.time[ i ] ) ) )
                }
                return array || errorMsg;
            }

            else if ( STRING || NUMBER ){
                return getTypeTime( option.type, new Date( option.time ) ) || errorMsg;

            }
            else if ( DATE ) {
                return getTypeTime( option.type, option.time ) || errorMsg;
            }

        }
        else if ( !option.time ) {

            if ( (!option.type) || (option.type && !timeStampTest.test( option.type )) ) {

                return getTypeTime( option.type || 'yyyymmddhhmmss', new Date() ) || errorMsg;

            }

            else if ( timeStampTest.test( option.type ) ) {

                if ( option.type === 'ms' ) {
                    return new Date().getTime() || errorMsg;
                }

                else {
                    return parseInt( new Date().getTime() / 1000 ) || errorMsg;
                }
            }

            else {

                return getTypeTime( option.type, new Date() );

            }

        }
    }

    /**
     * Configuration
     * 配置
     **********************************/
    function set( option ) {
        if ( option.lang ){
            //console.log( 'lang changed' )
            if( /^(zh|en)$/.test(option.lang) ){
                if( /^(zh)$/.test(option.lang) ){
                    lang = lang_zh;
                } else {
                    //console.log( 'lang en' )
                    lang = lang_en;
                }
                if( option.langSet ){
                    for( var x in lang ){
                        if( option.langSet[x] ){
                            lang[x] = option.langSet[x];
                        }
                    }
                }
            }
        }
    }

    chatime.prototype.get = get; chatime.prototype.getDiff = getExpDiff; chatime.prototype.newDate = getDateObject;
    window.chatime = chatime();

})( window );




