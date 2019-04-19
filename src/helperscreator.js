function createHelpers(lib, mylib) {
  'use strict';
  var cnt = 0;

  var Animator = mylib.Animator,
    q = lib.q,
    qlib = lib.qlib;

  function _cleanUpListener (listener) {
    listener.destroy();
    listener = null;
  }

  function AnimatorPromise (object, animation_props, defer) {
    this.animation = new Animator (object, animation_props);
    this.defer = defer || lib.q.defer();
    this._listener = null;

    if (!this.animation.destroyed){
      this.defer.resolve(true);
      lib.runNext (this.destroy.bind(this));
    }else{
      this._listener = this.animation.destroyed.attach(this.defer.resolve.bind(this.defer, true));
      this.defer.promise.done(this.destroy.bind(this));
    }
  }

  AnimatorPromise.prototype.destroy = function () {
    if (this._listener) this._listener.destroy();
    this._listener = null;
    if (this.animation) {
      this.animation.destroy();
    }
    this.animation = null;
    this.defer = null;
  };


  function animateAndPromise (object, animation_props, defer) {
    var animator = new AnimatorPromise(object, animation_props, defer);
    animator.defer.promise.done (_cleanup.bind(null, animator));
    return animator.defer.promise;
  }

  function _cleanup (animator) {
    animator = null;
  }


  function AnimationSequence () {
    this.animations = null;
    this.job = null;
    this.cnt = cnt++;
  }

  AnimationSequence.prototype.destroy = function () {
    this.stop();
    this.animations = null;
    if (this.job) this.job.destroy();
    this.job = null;
  };

  AnimationSequence.prototype.go = function (list) {
    this.animations = new Array(list.length);
    var jobs = new Array(list.length);

    for (var i = 0; i < list.length; i++) {
      this.animations[i] = null;
      jobs[i] = this._toJob.bind(this, i, list[i]);
    }
    this.job = new qlib.PromiseExecutorJob(jobs);
    return this.job.go();
  };

  AnimationSequence.prototype._toJob = function (index, list) {
    if (!this.animations) return q.resolve(true);

    //console.log('will start promise job on index ', index, this.cnt);
    this.animations[index] = new AnimatorPromise (list.object, list.params);
    var p = this.animations[index].defer.promise;
    p.done(this._stopJob.bind(this, index));
    return p;
  };

  AnimationSequence.prototype._stopJob = function (index) {
    if (!this.animations) return;
    this.animations[index] = null;
  };

  AnimationSequence.prototype.stop = function () {
    //console.log('will stop sequence ...', this.cnt);
    if (!this.job || !this.animations) return;
    this.job.destroy();
    this.job = null;
    for (var i = 0; i < this.animations.length; i++) {
      if (this.animations[i]) {
        //console.log('animation on index ', i, 'found');
        this.animations[i].destroy();
        this.animations[i] = null;
      }
    }
    this.animations = null;
  };

  mylib.helpers.animateAndPromise = animateAndPromise;
  mylib.helpers.AnimatorPromise = AnimatorPromise;
  mylib.helpers.AnimationSequence = AnimationSequence;
}

module.exports = createHelpers;
