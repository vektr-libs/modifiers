function createBaseEasings (EasingRegistry) {
  'use strict';

  function OutBounce(t, b, c, d) {
    if ((t/=d) < (1/2.75)) {
      return c*(7.5625*t*t) + b;
    } else if (t < (2/2.75)) {
      return c*(7.5625*(t-=(1.5/2.75))*t + 0.75) + b;
    } else if (t < (2.5/2.75)) {
      return c*(7.5625*(t-=(2.25/2.75))*t + 0.9375) + b;
    } else {
      return c*(7.5625*(t-=(2.625/2.75))*t + 0.984375) + b;
    }
  }

  function InBounce (t, b, c, d) {
    return c - OutBounce (d-t, 0, c, d) + b;
  }

  function AstableFast(t, b, c, d) {
    var cs = 10;
    var segment = d/cs;
    var ct = cs*t/d;

    var ret;


    var ts = Math.floor(ct);
    if (ts === 0) {
      ret = -c/10 * Math.sin(2*ct * (Math.PI/2));
    }else{
      ret = myOutElastic(t-d/cs,b,c,0.9*d);
    }
    return ret;
  }

  function myOutElastic (t,b,c,d) {
    var s=1.70158, p=0, a=c, coeff = t/d;
    if (t<=0) return b;
    if (coeff>=1) return b+c;
    if (!p) p=d*0.308;
    if (a < Math.abs(c)) { 
      a=c; s=p/4; 
    } else {
      s = p/(2*Math.PI) * Math.asin (c/a);
    }
    return a*Math.pow(1.42,-10*coeff) * Math.sin( (t-s)*(2*Math.PI)/p ) + c + b;
  }



  EasingRegistry.add('InBounce', InBounce);
  EasingRegistry.add('OutBounce',OutBounce);
  EasingRegistry.add('AstableFast', AstableFast);

  EasingRegistry.add('Linear', function(t, b, c, d) {
    return b+t/d*c;
  });
  EasingRegistry.add('InQuad', function(t, b, c, d) {
    return c*(t/=d)*t + b;
  });
  EasingRegistry.add('OutQuad', function(t, b, c, d) {
    return -c *(t/=d)*(t-2) + b;
  });
  EasingRegistry.add('InOutQuad', function(t, b, c, d) {
    t /= (d/2);
    if (t < 1) return c/2*t*t + b;
    return -c/2 * ((--t)*(t-2) - 1) + b;
  });
  EasingRegistry.add('InCubic', function(t, b, c, d) {
    return c*(t/=d)*t*t + b;
  });
  EasingRegistry.add('OutCubic', function(t, b, c, d) {
    return c*((t=t/d-1)*t*t + 1) + b;
  });
  EasingRegistry.add('InOutCubic', function(t, b, c, d) {
    t /= d/2;
    if (t < 1) return c/2*t*t*t + b;
    return c/2*((t-=2)*t*t + 2) + b;
  });
  EasingRegistry.add('InQuart', function(t, b, c, d) {
    return c*(t/=d)*t*t*t + b;
  });
  EasingRegistry.add('OutQuart', function(t, b, c, d) {
    return -c * ((t=t/d-1)*t*t*t - 1) + b;
  });
  EasingRegistry.add('InOutQuart', function(t, b, c, d) {
    t /= d/2;
    if (t < 1) return c/2*t*t*t*t + b;
    return -c/2 * ((t-=2)*t*t*t - 2) + b;
  });
  EasingRegistry.add('InQuint', function(t, b, c, d) {
    return c*(t/=d)*t*t*t*t + b;
  });
  EasingRegistry.add('OutQuint', function(t, b, c, d) {
    return c*((t=t/d-1)*t*t*t*t + 1) + b;
  });
  EasingRegistry.add('InOutQuint', function(t, b, c, d) {
    t /= d/2;
    if (t < 1) return c/2*t*t*t*t*t + b;
    return c/2*((t-=2)*t*t*t*t + 2) + b;
  });
  EasingRegistry.add('InSine', function(t, b, c, d) {
    return -c * Math.cos(t/d * (Math.PI/2)) + c + b;
  });
  EasingRegistry.add('OutSine ', function(t, b, c, d) {
    return c * Math.sin(t/d * (Math.PI/2)) + b;
  });
  EasingRegistry.add('InOutSine ', function(t, b, c, d) {
    return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
  });
  EasingRegistry.add('InExpo', function(t, b, c, d) {
    return (t===0) ? b : c * Math.pow(2, 10 * (t/d - 1)) + b;
  });
  EasingRegistry.add('OutExpo', function(t, b, c, d) {
    return (t===d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
  });
  EasingRegistry.add('InOutExpo', function(t, b, c, d) {
    if (t===0) return b;
    if (t===d) return b+c;
    t /= d/2;
    if (t < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b;
    return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;
  });
  EasingRegistry.add('InCirc', function(t, b, c, d) {
    return -c * (Math.sqrt(1 - (t/=d)*t) - 1) + b;
  });
  EasingRegistry.add('OutCirc', function(t, b, c, d) {
    return c * Math.sqrt(1 - (t=t/d-1)*t) + b;
  });
  EasingRegistry.add('InOutCirc', function(t, b, c, d) {
    t /= d/2;
    if (t < 1) return -c/2 * (Math.sqrt(1 - t*t) - 1) + b;
    return c/2 * (Math.sqrt(1 - (t-=2)*t) + 1) + b;
  });
  EasingRegistry.add('InElastic', function(t, b, c, d) {
    var s=1.70158;var p=0;var a=c;
    if (t===0) return b;
    t /= d;
    if (t===1) return b+c;
    if (!p) p=d*0.3;
    if (a < Math.abs(c)) { a=c; s=p/4; }
    else s = p/(2*Math.PI) * Math.asin (c/a);
    return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
  });
  EasingRegistry.add('OutElastic', function(t, b, c, d) {
    var s=1.70158;var p=0;var a=c;
    if (t===0) return b;
    t /= d;
    if (t===1) return b+c;
    if (!p) p=d*0.3;
    if (a < Math.abs(c)) { a=c; s=p/4; }
    else s = p/(2*Math.PI) * Math.asin (c/a);
    return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
  });
  EasingRegistry.add('InOutElastic', function(t, b, c, d) {
    var s=1.70158;var p=0;var a=c;
    if (t===0) return b;
    t /= d/2;
    if (t===2) return b+c;
    if (!p) p=d*(0.3*1.5);
    if (a < Math.abs(c)) { a=c; s=p/4; }
    else s = p/(2*Math.PI) * Math.asin (c/a);
    if (t < 1) return -0.5*(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
    return a*Math.pow(2,-10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )*0.5 + c + b;
  });
  EasingRegistry.add('InBack', function(t, b, c, d, s) {
    if (s === undefined) s = 1.70158;
    return c*(t/=d)*t*((s+1)*t - s) + b;
  });
  EasingRegistry.add('OutBack', function(t, b, c, d, s) {
    if (s === undefined) s = 1.70158;
    return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
  });
  EasingRegistry.add('InOutBack', function(t, b, c, d, s) {
    if (s === undefined) s = 1.70158;
    t /= d/2;
    if (t < 1) return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
    return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
  });
  EasingRegistry.add('InOutBounce', function(t, b, c, d) {
    if (t < d/2) return InBounce (t*2, 0, c, d) * 0.5 + b;
    return OutBounce (t*2-d, 0, c, d) * 0.5 + c*0.5 + b;
  });
  EasingRegistry.add( 'AstableSlow', function(t, b, c, d) {
    return AstableFast(t, b, c, d);
  });

  EasingRegistry.add('PiecewiseLinear', function(t, b, c, d, s) {
    var mp = {b:b, d:d, c:c, t:t}, _mp = mp,
      acc = {b:0, d:d, c:0, t:t, time:0, duration:0}, _acc = acc;
    if (HERS.isArray(s)) {
      s.some(function (p) {
        _acc.time += p.duration*d;
        //console.log(t, '<', _acc.time, '?');
        _mp.d = p.duration*d;
        _mp.c = p.amount*c;
        if (t < _acc.time) {
          _mp.b = _acc.b;
          _mp.t = _acc.t;
          return true;
        } else {
          _acc.b += p.amount*c;
          _acc.duration += _mp.d;
          _acc.d -= p.duration*d;
          _acc.t = t-_acc.duration;
          _acc.c += p.amount*c;
        }
      });
    }
    if (t>=acc.time && acc.d>0) {
      mp.b = acc.b;
      mp.c = c-acc.c;
      mp.d = acc.d;
      mp.t = acc.t;
    }
    //console.log('original b', b, 'c', c, 'd', d, 't', t);
    //console.log('actual b', mp.b, 'c', mp.c, 'd', mp.d, 't', mp.t);
    _mp = null;
    _acc = null;
    t = null;
    d = null;
    c = null;
    //console.log('finally', mp.b+mp.t/mp.d*mp.c);
    return mp.b+mp.t/mp.d*mp.c;
  });
}

module.exports = createBaseEasings;
