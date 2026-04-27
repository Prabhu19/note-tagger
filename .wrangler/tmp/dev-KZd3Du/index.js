var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// build/index.js
import { WorkerEntrypoint as Rt } from "cloudflare:workers";
import G from "./ed2c44e20c3b49991758aad23264994f6395e7b1-index_bg.wasm";
var $ = globalThis.__worker_init_state = { criticalError: false, instanceId: 0 };
var W = class {
  static {
    __name(this, "W");
  }
  __destroy_into_raw() {
    let t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, wt.unregister(this), t;
  }
  free() {
    let t = this.__destroy_into_raw();
    u(), s.__wbg_containerstartupoptions_free(t, 0);
  }
  get enableInternet() {
    if (this.__wbg_inst !== void 0 && this.__wbg_inst !== b) throw new Error("Invalid stale object from previous Wasm instance");
    let t;
    return u(), t = s.__wbg_get_containerstartupoptions_enableInternet(this.__wbg_ptr), t === 16777215 ? void 0 : t !== 0;
  }
  get entrypoint() {
    try {
      if (this.__wbg_inst !== void 0 && this.__wbg_inst !== b) throw new Error("Invalid stale object from previous Wasm instance");
      let o = s.__wbindgen_add_to_stack_pointer(-16);
      u(), s.__wbg_get_containerstartupoptions_entrypoint(o, this.__wbg_ptr);
      var t = a().getInt32(o + 0, true), e = a().getInt32(o + 4, true), n = C(t, e).slice();
      return s.__wbindgen_export4(t, e * 4, 4), n;
    } finally {
      s.__wbindgen_add_to_stack_pointer(16);
    }
  }
  get env() {
    if (this.__wbg_inst !== void 0 && this.__wbg_inst !== b) throw new Error("Invalid stale object from previous Wasm instance");
    let t;
    return u(), t = s.__wbg_get_containerstartupoptions_env(this.__wbg_ptr), h(t);
  }
  set enableInternet(t) {
    if (this.__wbg_inst !== void 0 && this.__wbg_inst !== b) throw new Error("Invalid stale object from previous Wasm instance");
    u(), s.__wbg_set_containerstartupoptions_enableInternet(this.__wbg_ptr, w(t) ? 16777215 : t ? 1 : 0);
  }
  set entrypoint(t) {
    if (this.__wbg_inst !== void 0 && this.__wbg_inst !== b) throw new Error("Invalid stale object from previous Wasm instance");
    let e = xt(t, s.__wbindgen_export), n = p;
    u(), s.__wbg_set_containerstartupoptions_entrypoint(this.__wbg_ptr, e, n);
  }
  set env(t) {
    if (this.__wbg_inst !== void 0 && this.__wbg_inst !== b) throw new Error("Invalid stale object from previous Wasm instance");
    u(), s.__wbg_set_containerstartupoptions_env(this.__wbg_ptr, i(t));
  }
};
Symbol.dispose && (W.prototype[Symbol.dispose] = W.prototype.free);
var k = class {
  static {
    __name(this, "k");
  }
  __destroy_into_raw() {
    let t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, lt.unregister(this), t;
  }
  free() {
    let t = this.__destroy_into_raw();
    u(), s.__wbg_intounderlyingbytesource_free(t, 0);
  }
  get autoAllocateChunkSize() {
    if (this.__wbg_inst !== void 0 && this.__wbg_inst !== b) throw new Error("Invalid stale object from previous Wasm instance");
    let t;
    return u(), t = s.intounderlyingbytesource_autoAllocateChunkSize(this.__wbg_ptr), t >>> 0;
  }
  cancel() {
    if (this.__wbg_inst !== void 0 && this.__wbg_inst !== b) throw new Error("Invalid stale object from previous Wasm instance");
    let t = this.__destroy_into_raw();
    u(), s.intounderlyingbytesource_cancel(t);
  }
  pull(t) {
    if (this.__wbg_inst !== void 0 && this.__wbg_inst !== b) throw new Error("Invalid stale object from previous Wasm instance");
    let e;
    return u(), e = s.intounderlyingbytesource_pull(this.__wbg_ptr, i(t)), h(e);
  }
  start(t) {
    if (this.__wbg_inst !== void 0 && this.__wbg_inst !== b) throw new Error("Invalid stale object from previous Wasm instance");
    u(), s.intounderlyingbytesource_start(this.__wbg_ptr, i(t));
  }
  get type() {
    if (this.__wbg_inst !== void 0 && this.__wbg_inst !== b) throw new Error("Invalid stale object from previous Wasm instance");
    let t;
    return u(), t = s.intounderlyingbytesource_type(this.__wbg_ptr), bt[t];
  }
};
Symbol.dispose && (k.prototype[Symbol.dispose] = k.prototype.free);
var A = class {
  static {
    __name(this, "A");
  }
  __destroy_into_raw() {
    let t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, pt.unregister(this), t;
  }
  free() {
    let t = this.__destroy_into_raw();
    u(), s.__wbg_intounderlyingsink_free(t, 0);
  }
  abort(t) {
    if (this.__wbg_inst !== void 0 && this.__wbg_inst !== b) throw new Error("Invalid stale object from previous Wasm instance");
    let e = this.__destroy_into_raw(), n;
    return u(), n = s.intounderlyingsink_abort(e, i(t)), h(n);
  }
  close() {
    if (this.__wbg_inst !== void 0 && this.__wbg_inst !== b) throw new Error("Invalid stale object from previous Wasm instance");
    let t = this.__destroy_into_raw(), e;
    return u(), e = s.intounderlyingsink_close(t), h(e);
  }
  write(t) {
    if (this.__wbg_inst !== void 0 && this.__wbg_inst !== b) throw new Error("Invalid stale object from previous Wasm instance");
    let e;
    return u(), e = s.intounderlyingsink_write(this.__wbg_ptr, i(t)), h(e);
  }
};
Symbol.dispose && (A.prototype[Symbol.dispose] = A.prototype.free);
var S = class _ {
  static {
    __name(this, "_");
  }
  static __wrap(t) {
    t = t >>> 0;
    let e = Object.create(_.prototype);
    return e.__wbg_ptr = t, Object.defineProperty(e, "__wbg_inst", { value: b, writable: true }), K.register(e, { ptr: t, instance: b }, e), e;
  }
  __destroy_into_raw() {
    let t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, K.unregister(this), t;
  }
  free() {
    let t = this.__destroy_into_raw();
    u(), s.__wbg_intounderlyingsource_free(t, 0);
  }
  cancel() {
    if (this.__wbg_inst !== void 0 && this.__wbg_inst !== b) throw new Error("Invalid stale object from previous Wasm instance");
    let t = this.__destroy_into_raw();
    u(), s.intounderlyingsource_cancel(t);
  }
  pull(t) {
    if (this.__wbg_inst !== void 0 && this.__wbg_inst !== b) throw new Error("Invalid stale object from previous Wasm instance");
    let e;
    return u(), e = s.intounderlyingsource_pull(this.__wbg_ptr, i(t)), h(e);
  }
};
Symbol.dispose && (S.prototype[Symbol.dispose] = S.prototype.free);
var O = class {
  static {
    __name(this, "O");
  }
  __destroy_into_raw() {
    let t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, ht.unregister(this), t;
  }
  free() {
    let t = this.__destroy_into_raw();
    u(), s.__wbg_minifyconfig_free(t, 0);
  }
  get css() {
    if (this.__wbg_inst !== void 0 && this.__wbg_inst !== b) throw new Error("Invalid stale object from previous Wasm instance");
    let t;
    return u(), t = s.__wbg_get_minifyconfig_css(this.__wbg_ptr), t !== 0;
  }
  get html() {
    if (this.__wbg_inst !== void 0 && this.__wbg_inst !== b) throw new Error("Invalid stale object from previous Wasm instance");
    let t;
    return u(), t = s.__wbg_get_minifyconfig_html(this.__wbg_ptr), t !== 0;
  }
  get js() {
    if (this.__wbg_inst !== void 0 && this.__wbg_inst !== b) throw new Error("Invalid stale object from previous Wasm instance");
    let t;
    return u(), t = s.__wbg_get_minifyconfig_js(this.__wbg_ptr), t !== 0;
  }
  set css(t) {
    if (this.__wbg_inst !== void 0 && this.__wbg_inst !== b) throw new Error("Invalid stale object from previous Wasm instance");
    u(), s.__wbg_set_minifyconfig_css(this.__wbg_ptr, t);
  }
  set html(t) {
    if (this.__wbg_inst !== void 0 && this.__wbg_inst !== b) throw new Error("Invalid stale object from previous Wasm instance");
    u(), s.__wbg_set_minifyconfig_html(this.__wbg_ptr, t);
  }
  set js(t) {
    if (this.__wbg_inst !== void 0 && this.__wbg_inst !== b) throw new Error("Invalid stale object from previous Wasm instance");
    u(), s.__wbg_set_minifyconfig_js(this.__wbg_ptr, t);
  }
};
Symbol.dispose && (O.prototype[Symbol.dispose] = O.prototype.free);
var L = class {
  static {
    __name(this, "L");
  }
  __destroy_into_raw() {
    let t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, yt.unregister(this), t;
  }
  free() {
    let t = this.__destroy_into_raw();
    u(), s.__wbg_r2range_free(t, 0);
  }
  get length() {
    try {
      if (this.__wbg_inst !== void 0 && this.__wbg_inst !== b) throw new Error("Invalid stale object from previous Wasm instance");
      let n = s.__wbindgen_add_to_stack_pointer(-16);
      u(), s.__wbg_get_r2range_length(n, this.__wbg_ptr);
      var t = a().getInt32(n + 0, true), e = a().getFloat64(n + 8, true);
      return t === 0 ? void 0 : e;
    } finally {
      s.__wbindgen_add_to_stack_pointer(16);
    }
  }
  get offset() {
    try {
      if (this.__wbg_inst !== void 0 && this.__wbg_inst !== b) throw new Error("Invalid stale object from previous Wasm instance");
      let n = s.__wbindgen_add_to_stack_pointer(-16);
      u(), s.__wbg_get_r2range_offset(n, this.__wbg_ptr);
      var t = a().getInt32(n + 0, true), e = a().getFloat64(n + 8, true);
      return t === 0 ? void 0 : e;
    } finally {
      s.__wbindgen_add_to_stack_pointer(16);
    }
  }
  get suffix() {
    try {
      if (this.__wbg_inst !== void 0 && this.__wbg_inst !== b) throw new Error("Invalid stale object from previous Wasm instance");
      let n = s.__wbindgen_add_to_stack_pointer(-16);
      u(), s.__wbg_get_r2range_suffix(n, this.__wbg_ptr);
      var t = a().getInt32(n + 0, true), e = a().getFloat64(n + 8, true);
      return t === 0 ? void 0 : e;
    } finally {
      s.__wbindgen_add_to_stack_pointer(16);
    }
  }
  set length(t) {
    if (this.__wbg_inst !== void 0 && this.__wbg_inst !== b) throw new Error("Invalid stale object from previous Wasm instance");
    u(), s.__wbg_set_r2range_length(this.__wbg_ptr, !w(t), w(t) ? 0 : t);
  }
  set offset(t) {
    if (this.__wbg_inst !== void 0 && this.__wbg_inst !== b) throw new Error("Invalid stale object from previous Wasm instance");
    u(), s.__wbg_set_r2range_offset(this.__wbg_ptr, !w(t), w(t) ? 0 : t);
  }
  set suffix(t) {
    if (this.__wbg_inst !== void 0 && this.__wbg_inst !== b) throw new Error("Invalid stale object from previous Wasm instance");
    u(), s.__wbg_set_r2range_suffix(this.__wbg_ptr, !w(t), w(t) ? 0 : t);
  }
};
Symbol.dispose && (L.prototype[Symbol.dispose] = L.prototype.free);
function Q() {
  u(), s.WORKERS_CHANNEL_BertClassifierWorker();
}
__name(Q, "Q");
function D() {
  b++, E = null, M = null, typeof numBytesDecoded < "u" && (numBytesDecoded = 0), typeof p < "u" && (p = 0), typeof m < "u" && (m = new Array(1024).fill(void 0), m = m.concat([void 0, null, true, false]), typeof R < "u" && (R = m.length)), nt = false, s = new WebAssembly.Instance(G, et()).exports, s.__wbindgen_start();
}
__name(D, "D");
function X() {
  let _2;
  return u(), _2 = s.__worker_init_state(), h(_2);
}
__name(X, "X");
function Y(_2, t, e) {
  let n;
  return u(), n = s.fetch(i(_2), i(t), i(e)), h(n);
}
__name(Y, "Y");
function Z() {
  u(), s.init();
}
__name(Z, "Z");
function tt() {
  u(), s.init_workers();
}
__name(tt, "tt");
function et() {
  return { __proto__: null, "./index_bg.js": { __proto__: null, __wbg_Error_960c155d3d49e4c2: /* @__PURE__ */ __name(function(t, e) {
    let n = Error(g(t, e));
    return i(n);
  }, "__wbg_Error_960c155d3d49e4c2"), __wbg_String_8564e559799eccda: /* @__PURE__ */ __name(function(t, e) {
    let n = String(r(e)), o = x(n, s.__wbindgen_export, s.__wbindgen_export2), c = p;
    a().setInt32(t + 4, c, true), a().setInt32(t + 0, o, true);
  }, "__wbg_String_8564e559799eccda"), __wbg___wbindgen_boolean_get_6ea149f0a8dcc5ff: /* @__PURE__ */ __name(function(t) {
    let e = r(t), n = typeof e == "boolean" ? e : void 0;
    return w(n) ? 16777215 : n ? 1 : 0;
  }, "__wbg___wbindgen_boolean_get_6ea149f0a8dcc5ff"), __wbg___wbindgen_debug_string_ab4b34d23d6778bd: /* @__PURE__ */ __name(function(t, e) {
    let n = q(r(e)), o = x(n, s.__wbindgen_export, s.__wbindgen_export2), c = p;
    a().setInt32(t + 4, c, true), a().setInt32(t + 0, o, true);
  }, "__wbg___wbindgen_debug_string_ab4b34d23d6778bd"), __wbg___wbindgen_in_a5d8b22e52b24dd1: /* @__PURE__ */ __name(function(t, e) {
    return r(t) in r(e);
  }, "__wbg___wbindgen_in_a5d8b22e52b24dd1"), __wbg___wbindgen_is_falsy_c07bb72123e65555: /* @__PURE__ */ __name(function(t) {
    return !r(t);
  }, "__wbg___wbindgen_is_falsy_c07bb72123e65555"), __wbg___wbindgen_is_function_3baa9db1a987f47d: /* @__PURE__ */ __name(function(t) {
    return typeof r(t) == "function";
  }, "__wbg___wbindgen_is_function_3baa9db1a987f47d"), __wbg___wbindgen_is_null_52ff4ec04186736f: /* @__PURE__ */ __name(function(t) {
    return r(t) === null;
  }, "__wbg___wbindgen_is_null_52ff4ec04186736f"), __wbg___wbindgen_is_object_63322ec0cd6ea4ef: /* @__PURE__ */ __name(function(t) {
    let e = r(t);
    return typeof e == "object" && e !== null;
  }, "__wbg___wbindgen_is_object_63322ec0cd6ea4ef"), __wbg___wbindgen_is_string_6df3bf7ef1164ed3: /* @__PURE__ */ __name(function(t) {
    return typeof r(t) == "string";
  }, "__wbg___wbindgen_is_string_6df3bf7ef1164ed3"), __wbg___wbindgen_is_undefined_29a43b4d42920abd: /* @__PURE__ */ __name(function(t) {
    return r(t) === void 0;
  }, "__wbg___wbindgen_is_undefined_29a43b4d42920abd"), __wbg___wbindgen_jsval_loose_eq_cac3565e89b4134c: /* @__PURE__ */ __name(function(t, e) {
    return r(t) == r(e);
  }, "__wbg___wbindgen_jsval_loose_eq_cac3565e89b4134c"), __wbg___wbindgen_number_get_c7f42aed0525c451: /* @__PURE__ */ __name(function(t, e) {
    let n = r(e), o = typeof n == "number" ? n : void 0;
    a().setFloat64(t + 8, w(o) ? 0 : o, true), a().setInt32(t + 0, !w(o), true);
  }, "__wbg___wbindgen_number_get_c7f42aed0525c451"), __wbg___wbindgen_string_get_7ed5322991caaec5: /* @__PURE__ */ __name(function(t, e) {
    let n = r(e), o = typeof n == "string" ? n : void 0;
    var c = w(o) ? 0 : x(o, s.__wbindgen_export, s.__wbindgen_export2), d = p;
    a().setInt32(t + 4, d, true), a().setInt32(t + 0, c, true);
  }, "__wbg___wbindgen_string_get_7ed5322991caaec5"), __wbg___wbindgen_throw_6b64449b9b9ed33c: /* @__PURE__ */ __name(function(t, e) {
    throw new Error(g(t, e));
  }, "__wbg___wbindgen_throw_6b64449b9b9ed33c"), __wbg__wbg_cb_unref_b46c9b5a9f08ec37: /* @__PURE__ */ __name(function(t) {
    r(t)._wbg_cb_unref();
  }, "__wbg__wbg_cb_unref_b46c9b5a9f08ec37"), __wbg_addEventListener_8176dab41b09531c: /* @__PURE__ */ __name(function() {
    return f(function(t, e, n, o) {
      r(t).addEventListener(g(e, n), r(o));
    }, arguments);
  }, "__wbg_addEventListener_8176dab41b09531c"), __wbg_append_e8fc56ce7c00e874: /* @__PURE__ */ __name(function() {
    return f(function(t, e, n, o, c) {
      r(t).append(g(e, n), g(o, c));
    }, arguments);
  }, "__wbg_append_e8fc56ce7c00e874"), __wbg_arrayBuffer_41196c212b3af809: /* @__PURE__ */ __name(function() {
    return f(function(t) {
      let e = r(t).arrayBuffer();
      return i(e);
    }, arguments);
  }, "__wbg_arrayBuffer_41196c212b3af809"), __wbg_arrayBuffer_848c392b70c67d3d: /* @__PURE__ */ __name(function() {
    return f(function(t) {
      let e = r(t).arrayBuffer();
      return i(e);
    }, arguments);
  }, "__wbg_arrayBuffer_848c392b70c67d3d"), __wbg_baseURI_e145a8755e339dab: /* @__PURE__ */ __name(function() {
    return f(function(t, e) {
      let n = r(e).baseURI;
      var o = w(n) ? 0 : x(n, s.__wbindgen_export, s.__wbindgen_export2), c = p;
      a().setInt32(t + 4, c, true), a().setInt32(t + 0, o, true);
    }, arguments);
  }, "__wbg_baseURI_e145a8755e339dab"), __wbg_body_36940522e8c69409: /* @__PURE__ */ __name(function(t) {
    let e = r(t).body;
    return w(e) ? 0 : i(e);
  }, "__wbg_body_36940522e8c69409"), __wbg_buffer_d0f5ea0926a691fd: /* @__PURE__ */ __name(function(t) {
    let e = r(t).buffer;
    return i(e);
  }, "__wbg_buffer_d0f5ea0926a691fd"), __wbg_byobRequest_dc6aed9db01b12c6: /* @__PURE__ */ __name(function(t) {
    let e = r(t).byobRequest;
    return w(e) ? 0 : i(e);
  }, "__wbg_byobRequest_dc6aed9db01b12c6"), __wbg_byteLength_3e660e5661f3327e: /* @__PURE__ */ __name(function(t) {
    return r(t).byteLength;
  }, "__wbg_byteLength_3e660e5661f3327e"), __wbg_byteOffset_ecd62abe44dd28d4: /* @__PURE__ */ __name(function(t) {
    return r(t).byteOffset;
  }, "__wbg_byteOffset_ecd62abe44dd28d4"), __wbg_call_a24592a6f349a97e: /* @__PURE__ */ __name(function() {
    return f(function(t, e, n) {
      let o = r(t).call(r(e), r(n));
      return i(o);
    }, arguments);
  }, "__wbg_call_a24592a6f349a97e"), __wbg_cancelBubble_56aa5b315d711482: /* @__PURE__ */ __name(function(t) {
    return r(t).cancelBubble;
  }, "__wbg_cancelBubble_56aa5b315d711482"), __wbg_cancel_ceb1bda02e29f0a9: /* @__PURE__ */ __name(function(t) {
    let e = r(t).cancel();
    return i(e);
  }, "__wbg_cancel_ceb1bda02e29f0a9"), __wbg_catch_e9362815fd0b24cf: /* @__PURE__ */ __name(function(t, e) {
    let n = r(t).catch(r(e));
    return i(n);
  }, "__wbg_catch_e9362815fd0b24cf"), __wbg_cause_9e61ba47f40dd7e8: /* @__PURE__ */ __name(function(t) {
    let e = r(t).cause;
    return i(e);
  }, "__wbg_cause_9e61ba47f40dd7e8"), __wbg_cf_da3280bfacc59d75: /* @__PURE__ */ __name(function() {
    return f(function(t) {
      let e = r(t).cf;
      return w(e) ? 0 : i(e);
    }, arguments);
  }, "__wbg_cf_da3280bfacc59d75"), __wbg_cloneNode_50658ff5fec44693: /* @__PURE__ */ __name(function() {
    return f(function(t, e) {
      let n = r(t).cloneNode(e !== 0);
      return i(n);
    }, arguments);
  }, "__wbg_cloneNode_50658ff5fec44693"), __wbg_cloneNode_eb01fe238729dac4: /* @__PURE__ */ __name(function() {
    return f(function(t) {
      let e = r(t).cloneNode();
      return i(e);
    }, arguments);
  }, "__wbg_cloneNode_eb01fe238729dac4"), __wbg_close_e6c8977a002e9e13: /* @__PURE__ */ __name(function() {
    return f(function(t) {
      r(t).close();
    }, arguments);
  }, "__wbg_close_e6c8977a002e9e13"), __wbg_close_fb954dfaf67b5732: /* @__PURE__ */ __name(function() {
    return f(function(t) {
      r(t).close();
    }, arguments);
  }, "__wbg_close_fb954dfaf67b5732"), __wbg_composedPath_e2b9e0f5161335eb: /* @__PURE__ */ __name(function(t) {
    let e = r(t).composedPath();
    return i(e);
  }, "__wbg_composedPath_e2b9e0f5161335eb"), __wbg_constructor_9f0cb60f616370a8: /* @__PURE__ */ __name(function(t) {
    let e = r(t).constructor;
    return i(e);
  }, "__wbg_constructor_9f0cb60f616370a8"), __wbg_content_13d0cb7e0ea91c39: /* @__PURE__ */ __name(function(t) {
    let e = r(t).content;
    return i(e);
  }, "__wbg_content_13d0cb7e0ea91c39"), __wbg_createComment_592a0c17b1cf8cad: /* @__PURE__ */ __name(function(t, e, n) {
    let o = r(t).createComment(g(e, n));
    return i(o);
  }, "__wbg_createComment_592a0c17b1cf8cad"), __wbg_createElementNS_e0e4bbb6e664f948: /* @__PURE__ */ __name(function() {
    return f(function(t, e, n, o, c) {
      let d = r(t).createElementNS(e === 0 ? void 0 : g(e, n), g(o, c));
      return i(d);
    }, arguments);
  }, "__wbg_createElementNS_e0e4bbb6e664f948"), __wbg_createElement_bbd4c90086fe6f7b: /* @__PURE__ */ __name(function() {
    return f(function(t, e, n) {
      let o = r(t).createElement(g(e, n));
      return i(o);
    }, arguments);
  }, "__wbg_createElement_bbd4c90086fe6f7b"), __wbg_createObjectURL_46e1b0c55389893b: /* @__PURE__ */ __name(function() {
    return f(function(t, e) {
      let n = URL.createObjectURL(r(e)), o = x(n, s.__wbindgen_export, s.__wbindgen_export2), c = p;
      a().setInt32(t + 4, c, true), a().setInt32(t + 0, o, true);
    }, arguments);
  }, "__wbg_createObjectURL_46e1b0c55389893b"), __wbg_createTextNode_7949043038fd9f7b: /* @__PURE__ */ __name(function(t, e, n) {
    let o = r(t).createTextNode(g(e, n));
    return i(o);
  }, "__wbg_createTextNode_7949043038fd9f7b"), __wbg_data_bb9dffdd1e99cf2d: /* @__PURE__ */ __name(function(t) {
    let e = r(t).data;
    return i(e);
  }, "__wbg_data_bb9dffdd1e99cf2d"), __wbg_debug_eaef3b49d572d680: /* @__PURE__ */ __name(function(t, e) {
    var n = C(t, e).slice();
    s.__wbindgen_export4(t, e * 4, 4), console.debug(...n);
  }, "__wbg_debug_eaef3b49d572d680"), __wbg_deleteProperty_d5f7bd763acbdb44: /* @__PURE__ */ __name(function() {
    return f(function(t, e) {
      return Reflect.deleteProperty(r(t), r(e));
    }, arguments);
  }, "__wbg_deleteProperty_d5f7bd763acbdb44"), __wbg_document_7a41071f2f439323: /* @__PURE__ */ __name(function(t) {
    let e = r(t).document;
    return w(e) ? 0 : i(e);
  }, "__wbg_document_7a41071f2f439323"), __wbg_done_9158f7cc8751ba32: /* @__PURE__ */ __name(function(t) {
    return r(t).done;
  }, "__wbg_done_9158f7cc8751ba32"), __wbg_enqueue_4767ce322820c94d: /* @__PURE__ */ __name(function() {
    return f(function(t, e) {
      r(t).enqueue(r(e));
    }, arguments);
  }, "__wbg_enqueue_4767ce322820c94d"), __wbg_entries_bf727fcd7bf35a41: /* @__PURE__ */ __name(function(t) {
    let e = r(t).entries();
    return i(e);
  }, "__wbg_entries_bf727fcd7bf35a41"), __wbg_entries_e0b73aa8571ddb56: /* @__PURE__ */ __name(function(t) {
    let e = Object.entries(r(t));
    return i(e);
  }, "__wbg_entries_e0b73aa8571ddb56"), __wbg_error_2001591ad2463697: /* @__PURE__ */ __name(function(t) {
    console.error(r(t));
  }, "__wbg_error_2001591ad2463697"), __wbg_error_71b0e71161a5f3a0: /* @__PURE__ */ __name(function(t, e) {
    var n = C(t, e).slice();
    s.__wbindgen_export4(t, e * 4, 4), console.error(...n);
  }, "__wbg_error_71b0e71161a5f3a0"), __wbg_error_a6fa202b58aa1cd3: /* @__PURE__ */ __name(function(t, e) {
    let n, o;
    try {
      n = t, o = e, console.error(g(t, e));
    } finally {
      u(), s.__wbindgen_export4(n, o, 1);
    }
  }, "__wbg_error_a6fa202b58aa1cd3"), __wbg_error_f536c7930d1c5c8d: /* @__PURE__ */ __name(function(t, e) {
    console.error(r(t), r(e));
  }, "__wbg_error_f536c7930d1c5c8d"), __wbg_fetch_bc4036ca04c5b635: /* @__PURE__ */ __name(function(t, e, n) {
    let o = r(t).fetch(g(e, n));
    return i(o);
  }, "__wbg_fetch_bc4036ca04c5b635"), __wbg_firstChild_d4bf03999a23e79a: /* @__PURE__ */ __name(function(t) {
    let e = r(t).firstChild;
    return w(e) ? 0 : i(e);
  }, "__wbg_firstChild_d4bf03999a23e79a"), __wbg_firstElementChild_f67647a589d437a2: /* @__PURE__ */ __name(function(t) {
    let e = r(t).firstElementChild;
    return w(e) ? 0 : i(e);
  }, "__wbg_firstElementChild_f67647a589d437a2"), __wbg_getAttribute_8627dea35cdb7b06: /* @__PURE__ */ __name(function(t, e, n, o) {
    let c = r(e).getAttribute(g(n, o));
    var d = w(c) ? 0 : x(c, s.__wbindgen_export, s.__wbindgen_export2), l = p;
    a().setInt32(t + 4, l, true), a().setInt32(t + 0, d, true);
  }, "__wbg_getAttribute_8627dea35cdb7b06"), __wbg_getRandomValues_3f44b700395062e5: /* @__PURE__ */ __name(function() {
    return f(function(t, e) {
      globalThis.crypto.getRandomValues(B(t, e));
    }, arguments);
  }, "__wbg_getRandomValues_3f44b700395062e5"), __wbg_getReader_9facd4f899beac89: /* @__PURE__ */ __name(function() {
    return f(function(t) {
      let e = r(t).getReader();
      return i(e);
    }, arguments);
  }, "__wbg_getReader_9facd4f899beac89"), __wbg_get_6011fa3a58f61074: /* @__PURE__ */ __name(function() {
    return f(function(t, e) {
      let n = Reflect.get(r(t), r(e));
      return i(n);
    }, arguments);
  }, "__wbg_get_6011fa3a58f61074"), __wbg_get_8360291721e2339f: /* @__PURE__ */ __name(function(t, e) {
    let n = r(t)[e >>> 0];
    return i(n);
  }, "__wbg_get_8360291721e2339f"), __wbg_get_done_282bca5d3f90e0a8: /* @__PURE__ */ __name(function(t) {
    let e = r(t).done;
    return w(e) ? 16777215 : e ? 1 : 0;
  }, "__wbg_get_done_282bca5d3f90e0a8"), __wbg_get_eb5c1d725c36f932: /* @__PURE__ */ __name(function() {
    return f(function(t, e, n, o) {
      let c, d;
      try {
        c = e, d = n;
        let l = r(t).get(g(e, n), h(o));
        return i(l);
      } finally {
        u(), s.__wbindgen_export4(c, d, 1);
      }
    }, arguments);
  }, "__wbg_get_eb5c1d725c36f932"), __wbg_get_value_65a7a2c60b42fd75: /* @__PURE__ */ __name(function(t) {
    let e = r(t).value;
    return i(e);
  }, "__wbg_get_value_65a7a2c60b42fd75"), __wbg_head_77bab63b2165751c: /* @__PURE__ */ __name(function(t) {
    let e = r(t).head;
    return w(e) ? 0 : i(e);
  }, "__wbg_head_77bab63b2165751c"), __wbg_headers_cd7ea89df2f6ff86: /* @__PURE__ */ __name(function(t) {
    let e = r(t).headers;
    return i(e);
  }, "__wbg_headers_cd7ea89df2f6ff86"), __wbg_host_207aa9237088c9e9: /* @__PURE__ */ __name(function(t) {
    let e = r(t).host;
    return i(e);
  }, "__wbg_host_207aa9237088c9e9"), __wbg_httpProtocol_35bf99a144729324: /* @__PURE__ */ __name(function() {
    return f(function(t, e) {
      let n = r(e).httpProtocol, o = x(n, s.__wbindgen_export, s.__wbindgen_export2), c = p;
      a().setInt32(t + 4, c, true), a().setInt32(t + 0, o, true);
    }, arguments);
  }, "__wbg_httpProtocol_35bf99a144729324"), __wbg_insertBefore_38c7d835a2dcac23: /* @__PURE__ */ __name(function() {
    return f(function(t, e, n) {
      let o = r(t).insertBefore(r(e), r(n));
      return i(o);
    }, arguments);
  }, "__wbg_insertBefore_38c7d835a2dcac23"), __wbg_instanceId_23752a922e5c7aef: /* @__PURE__ */ __name(function(t) {
    return r(t).instanceId;
  }, "__wbg_instanceId_23752a922e5c7aef"), __wbg_instanceof_ArrayBuffer_7c8433c6ed14ffe3: /* @__PURE__ */ __name(function(t) {
    let e;
    try {
      e = r(t) instanceof ArrayBuffer;
    } catch {
      e = false;
    }
    return e;
  }, "__wbg_instanceof_ArrayBuffer_7c8433c6ed14ffe3"), __wbg_instanceof_Element_56c8d987654f359e: /* @__PURE__ */ __name(function(t) {
    let e;
    try {
      e = r(t) instanceof Element;
    } catch {
      e = false;
    }
    return e;
  }, "__wbg_instanceof_Element_56c8d987654f359e"), __wbg_instanceof_Error_6872d63ba7922898: /* @__PURE__ */ __name(function(t) {
    let e;
    try {
      e = r(t) instanceof Error;
    } catch {
      e = false;
    }
    return e;
  }, "__wbg_instanceof_Error_6872d63ba7922898"), __wbg_instanceof_ShadowRoot_d26d95cd2363a2c1: /* @__PURE__ */ __name(function(t) {
    let e;
    try {
      e = r(t) instanceof ShadowRoot;
    } catch {
      e = false;
    }
    return e;
  }, "__wbg_instanceof_ShadowRoot_d26d95cd2363a2c1"), __wbg_instanceof_Uint8Array_152ba1f289edcf3f: /* @__PURE__ */ __name(function(t) {
    let e;
    try {
      e = r(t) instanceof Uint8Array;
    } catch {
      e = false;
    }
    return e;
  }, "__wbg_instanceof_Uint8Array_152ba1f289edcf3f"), __wbg_instanceof_Window_cc64c86c8ef9e02b: /* @__PURE__ */ __name(function(t) {
    let e;
    try {
      e = r(t) instanceof Window;
    } catch {
      e = false;
    }
    return e;
  }, "__wbg_instanceof_Window_cc64c86c8ef9e02b"), __wbg_length_3d4ecd04bd8d22f1: /* @__PURE__ */ __name(function(t) {
    return r(t).length;
  }, "__wbg_length_3d4ecd04bd8d22f1"), __wbg_length_9f1775224cf1d815: /* @__PURE__ */ __name(function(t) {
    return r(t).length;
  }, "__wbg_length_9f1775224cf1d815"), __wbg_location_9caf61acec7c7a26: /* @__PURE__ */ __name(function(t) {
    let e = r(t).location;
    return i(e);
  }, "__wbg_location_9caf61acec7c7a26"), __wbg_log_7a0760e115750083: /* @__PURE__ */ __name(function(t, e) {
    var n = C(t, e).slice();
    s.__wbindgen_export4(t, e * 4, 4), console.log(...n);
  }, "__wbg_log_7a0760e115750083"), __wbg_log_7e1aa9064a1dbdbd: /* @__PURE__ */ __name(function(t) {
    console.log(r(t));
  }, "__wbg_log_7e1aa9064a1dbdbd"), __wbg_method_0384ffe0cd3d03b1: /* @__PURE__ */ __name(function(t, e) {
    let n = r(e).method, o = x(n, s.__wbindgen_export, s.__wbindgen_export2), c = p;
    a().setInt32(t + 4, c, true), a().setInt32(t + 0, o, true);
  }, "__wbg_method_0384ffe0cd3d03b1"), __wbg_name_4049a9179544f842: /* @__PURE__ */ __name(function(t) {
    let e = r(t).name;
    return i(e);
  }, "__wbg_name_4049a9179544f842"), __wbg_new_0c7403db6e782f19: /* @__PURE__ */ __name(function(t) {
    let e = new Uint8Array(r(t));
    return i(e);
  }, "__wbg_new_0c7403db6e782f19"), __wbg_new_15a4889b4b90734d: /* @__PURE__ */ __name(function() {
    return f(function() {
      let t = new Headers();
      return i(t);
    }, arguments);
  }, "__wbg_new_15a4889b4b90734d"), __wbg_new_227d7c05414eb861: /* @__PURE__ */ __name(function() {
    let t = new Error();
    return i(t);
  }, "__wbg_new_227d7c05414eb861"), __wbg_new_45b7c9fc161d9f04: /* @__PURE__ */ __name(function() {
    return f(function(t) {
      let e = new FixedLengthStream(t >>> 0);
      return i(e);
    }, arguments);
  }, "__wbg_new_45b7c9fc161d9f04"), __wbg_new_490db15a0a09fb24: /* @__PURE__ */ __name(function() {
    return f(function(t, e) {
      let n = new URL(g(t, e));
      return i(n);
    }, arguments);
  }, "__wbg_new_490db15a0a09fb24"), __wbg_new_5e360d2ff7b9e1c3: /* @__PURE__ */ __name(function(t, e) {
    let n = new Error(g(t, e));
    return i(n);
  }, "__wbg_new_5e360d2ff7b9e1c3"), __wbg_new_682678e2f47e32bc: /* @__PURE__ */ __name(function() {
    let t = new Array();
    return i(t);
  }, "__wbg_new_682678e2f47e32bc"), __wbg_new_aa8d0fa9762c29bd: /* @__PURE__ */ __name(function() {
    let t = new Object();
    return i(t);
  }, "__wbg_new_aa8d0fa9762c29bd"), __wbg_new_big_int_2519cefa496b314e: /* @__PURE__ */ __name(function() {
    return f(function(t) {
      let e = new FixedLengthStream(h(t));
      return i(e);
    }, arguments);
  }, "__wbg_new_big_int_2519cefa496b314e"), __wbg_new_typed_323f37fd55ab048d: /* @__PURE__ */ __name(function(t, e) {
    try {
      var n = { a: t, b: e }, o = /* @__PURE__ */ __name((d, l) => {
        let y = n.a;
        n.a = 0;
        try {
          return at(y, n.b, d, l);
        } finally {
          n.a = y;
        }
      }, "o");
      let c = new Promise(o);
      return i(c);
    } finally {
      n.a = 0;
    }
  }, "__wbg_new_typed_323f37fd55ab048d"), __wbg_new_with_base_9ed07c2edb5f9f52: /* @__PURE__ */ __name(function() {
    return f(function(t, e, n, o) {
      let c = new URL(g(t, e), g(n, o));
      return i(c);
    }, arguments);
  }, "__wbg_new_with_base_9ed07c2edb5f9f52"), __wbg_new_with_byte_offset_and_length_01848e8d6a3d49ad: /* @__PURE__ */ __name(function(t, e, n) {
    let o = new Uint8Array(r(t), e >>> 0, n >>> 0);
    return i(o);
  }, "__wbg_new_with_byte_offset_and_length_01848e8d6a3d49ad"), __wbg_new_with_into_underlying_source_fd904252f385f59c: /* @__PURE__ */ __name(function(t, e) {
    let n = new ReadableStream(S.__wrap(t), h(e));
    return i(n);
  }, "__wbg_new_with_into_underlying_source_fd904252f385f59c"), __wbg_new_with_length_8c854e41ea4dae9b: /* @__PURE__ */ __name(function(t) {
    let e = new Uint8Array(t >>> 0);
    return i(e);
  }, "__wbg_new_with_length_8c854e41ea4dae9b"), __wbg_new_with_opt_buffer_source_and_init_a16f51e86bb7c214: /* @__PURE__ */ __name(function() {
    return f(function(t, e) {
      let n = new Response(r(t), r(e));
      return i(n);
    }, arguments);
  }, "__wbg_new_with_opt_buffer_source_and_init_a16f51e86bb7c214"), __wbg_new_with_opt_readable_stream_and_init_38c96167c370948a: /* @__PURE__ */ __name(function() {
    return f(function(t, e) {
      let n = new Response(r(t), r(e));
      return i(n);
    }, arguments);
  }, "__wbg_new_with_opt_readable_stream_and_init_38c96167c370948a"), __wbg_new_with_opt_str_and_init_c50a129670061a4d: /* @__PURE__ */ __name(function() {
    return f(function(t, e, n) {
      let o = new Response(t === 0 ? void 0 : g(t, e), r(n));
      return i(o);
    }, arguments);
  }, "__wbg_new_with_opt_str_and_init_c50a129670061a4d"), __wbg_new_with_options_5e6f4d9d99734e80: /* @__PURE__ */ __name(function() {
    return f(function(t, e, n) {
      let o = new Worker(g(t, e), r(n));
      return i(o);
    }, arguments);
  }, "__wbg_new_with_options_5e6f4d9d99734e80"), __wbg_new_with_str_sequence_and_options_2cfc7ae8f9435aa4: /* @__PURE__ */ __name(function() {
    return f(function(t, e) {
      let n = new Blob(r(t), r(e));
      return i(n);
    }, arguments);
  }, "__wbg_new_with_str_sequence_and_options_2cfc7ae8f9435aa4"), __wbg_nextSibling_58f635df24be0787: /* @__PURE__ */ __name(function(t) {
    let e = r(t).nextSibling;
    return w(e) ? 0 : i(e);
  }, "__wbg_nextSibling_58f635df24be0787"), __wbg_next_0340c4ae324393c3: /* @__PURE__ */ __name(function() {
    return f(function(t) {
      let e = r(t).next();
      return i(e);
    }, arguments);
  }, "__wbg_next_0340c4ae324393c3"), __wbg_nodeType_1e98f026e15a17e5: /* @__PURE__ */ __name(function(t) {
    return r(t).nodeType;
  }, "__wbg_nodeType_1e98f026e15a17e5"), __wbg_now_a9b7df1cbee90986: /* @__PURE__ */ __name(function() {
    return Date.now();
  }, "__wbg_now_a9b7df1cbee90986"), __wbg_origin_e45eedd4c15443b9: /* @__PURE__ */ __name(function(t, e) {
    let n = r(e).origin, o = x(n, s.__wbindgen_export, s.__wbindgen_export2), c = p;
    a().setInt32(t + 4, c, true), a().setInt32(t + 0, o, true);
  }, "__wbg_origin_e45eedd4c15443b9"), __wbg_parentNode_e94744054a57a837: /* @__PURE__ */ __name(function(t) {
    let e = r(t).parentNode;
    return w(e) ? 0 : i(e);
  }, "__wbg_parentNode_e94744054a57a837"), __wbg_pipeTo_c70908426f8110f8: /* @__PURE__ */ __name(function(t, e) {
    let n = r(t).pipeTo(r(e));
    return i(n);
  }, "__wbg_pipeTo_c70908426f8110f8"), __wbg_postMessage_05c4f5b252fddf64: /* @__PURE__ */ __name(function() {
    return f(function(t, e) {
      r(t).postMessage(r(e));
    }, arguments);
  }, "__wbg_postMessage_05c4f5b252fddf64"), __wbg_postMessage_2e8ce5e10ce05091: /* @__PURE__ */ __name(function() {
    return f(function(t, e, n) {
      r(t).postMessage(r(e), r(n));
    }, arguments);
  }, "__wbg_postMessage_2e8ce5e10ce05091"), __wbg_postMessage_bc6bfa59c9b4c4ce: /* @__PURE__ */ __name(function() {
    return f(function(t, e, n) {
      r(t).postMessage(r(e), r(n));
    }, arguments);
  }, "__wbg_postMessage_bc6bfa59c9b4c4ce"), __wbg_postMessage_fd3e922532e00928: /* @__PURE__ */ __name(function() {
    return f(function(t, e) {
      r(t).postMessage(r(e));
    }, arguments);
  }, "__wbg_postMessage_fd3e922532e00928"), __wbg_prototypesetcall_a6b02eb00b0f4ce2: /* @__PURE__ */ __name(function(t, e, n) {
    Uint8Array.prototype.set.call(B(t, e), r(n));
  }, "__wbg_prototypesetcall_a6b02eb00b0f4ce2"), __wbg_push_471a5b068a5295f6: /* @__PURE__ */ __name(function(t, e) {
    return r(t).push(r(e));
  }, "__wbg_push_471a5b068a5295f6"), __wbg_put_fa25c91eed3b39e4: /* @__PURE__ */ __name(function() {
    return f(function(t, e, n, o, c) {
      let d, l;
      try {
        d = e, l = n;
        let y = r(t).put(g(e, n), h(o), h(c));
        return i(y);
      } finally {
        u(), s.__wbindgen_export4(d, l, 1);
      }
    }, arguments);
  }, "__wbg_put_fa25c91eed3b39e4"), __wbg_querySelector_8d395ebd237ebd46: /* @__PURE__ */ __name(function() {
    return f(function(t, e, n) {
      let o = r(t).querySelector(g(e, n));
      return w(o) ? 0 : i(o);
    }, arguments);
  }, "__wbg_querySelector_8d395ebd237ebd46"), __wbg_queueMicrotask_5d15a957e6aa920e: /* @__PURE__ */ __name(function(t) {
    queueMicrotask(r(t));
  }, "__wbg_queueMicrotask_5d15a957e6aa920e"), __wbg_queueMicrotask_f8819e5ffc402f36: /* @__PURE__ */ __name(function(t) {
    let e = r(t).queueMicrotask;
    return i(e);
  }, "__wbg_queueMicrotask_f8819e5ffc402f36"), __wbg_read_ddc2d178d2e57272: /* @__PURE__ */ __name(function(t) {
    let e = r(t).read();
    return i(e);
  }, "__wbg_read_ddc2d178d2e57272"), __wbg_readable_3e2eff0d97ab3474: /* @__PURE__ */ __name(function(t) {
    let e = r(t).readable;
    return i(e);
  }, "__wbg_readable_3e2eff0d97ab3474"), __wbg_redirect_9814b8be001f7db3: /* @__PURE__ */ __name(function(t) {
    let e = r(t).redirect;
    return (dt.indexOf(e) + 1 || 4) - 1;
  }, "__wbg_redirect_9814b8be001f7db3"), __wbg_releaseLock_9baaf3ccc5cfad69: /* @__PURE__ */ __name(function(t) {
    r(t).releaseLock();
  }, "__wbg_releaseLock_9baaf3ccc5cfad69"), __wbg_removeAttribute_c75ac657c944b3f1: /* @__PURE__ */ __name(function() {
    return f(function(t, e, n) {
      r(t).removeAttribute(g(e, n));
    }, arguments);
  }, "__wbg_removeAttribute_c75ac657c944b3f1"), __wbg_removeEventListener_7bdf07404d9b24bd: /* @__PURE__ */ __name(function() {
    return f(function(t, e, n, o) {
      r(t).removeEventListener(g(e, n), r(o));
    }, arguments);
  }, "__wbg_removeEventListener_7bdf07404d9b24bd"), __wbg_remove_48cb93cf7a6c4260: /* @__PURE__ */ __name(function(t) {
    r(t).remove();
  }, "__wbg_remove_48cb93cf7a6c4260"), __wbg_remove_9ffcfa2a5664fa43: /* @__PURE__ */ __name(function(t) {
    r(t).remove();
  }, "__wbg_remove_9ffcfa2a5664fa43"), __wbg_resolve_e6c466bc1052f16c: /* @__PURE__ */ __name(function(t) {
    let e = Promise.resolve(r(t));
    return i(e);
  }, "__wbg_resolve_e6c466bc1052f16c"), __wbg_respond_008ca9525ae22847: /* @__PURE__ */ __name(function() {
    return f(function(t, e) {
      r(t).respond(e >>> 0);
    }, arguments);
  }, "__wbg_respond_008ca9525ae22847"), __wbg_setAttribute_6fde4098d274155c: /* @__PURE__ */ __name(function() {
    return f(function(t, e, n, o, c) {
      r(t).setAttribute(g(e, n), g(o, c));
    }, arguments);
  }, "__wbg_setAttribute_6fde4098d274155c"), __wbg_set_022bee52d0b05b19: /* @__PURE__ */ __name(function() {
    return f(function(t, e, n) {
      return Reflect.set(r(t), r(e), r(n));
    }, arguments);
  }, "__wbg_set_022bee52d0b05b19"), __wbg_set_3d484eb794afec82: /* @__PURE__ */ __name(function(t, e, n) {
    r(t).set(B(e, n));
  }, "__wbg_set_3d484eb794afec82"), __wbg_set_criticalError_a317cc58ad3efd1a: /* @__PURE__ */ __name(function(t, e) {
    r(t).criticalError = e !== 0;
  }, "__wbg_set_criticalError_a317cc58ad3efd1a"), __wbg_set_headers_d567a640ab3a7735: /* @__PURE__ */ __name(function(t, e) {
    r(t).headers = r(e);
  }, "__wbg_set_headers_d567a640ab3a7735"), __wbg_set_high_water_mark_0ac7cc8f39856bad: /* @__PURE__ */ __name(function(t, e) {
    r(t).highWaterMark = e;
  }, "__wbg_set_high_water_mark_0ac7cc8f39856bad"), __wbg_set_innerHTML_a3c82996073b31ea: /* @__PURE__ */ __name(function(t, e, n) {
    r(t).innerHTML = g(e, n);
  }, "__wbg_set_innerHTML_a3c82996073b31ea"), __wbg_set_instanceId_f98d02561c814f7f: /* @__PURE__ */ __name(function(t, e) {
    r(t).instanceId = e >>> 0;
  }, "__wbg_set_instanceId_f98d02561c814f7f"), __wbg_set_name_a03c32fe09fba65d: /* @__PURE__ */ __name(function(t, e, n) {
    r(t).name = g(e, n);
  }, "__wbg_set_name_a03c32fe09fba65d"), __wbg_set_nodeValue_f39ed00fc286b285: /* @__PURE__ */ __name(function(t, e, n) {
    r(t).nodeValue = e === 0 ? void 0 : g(e, n);
  }, "__wbg_set_nodeValue_f39ed00fc286b285"), __wbg_set_onmessage_4267515727ed4c68: /* @__PURE__ */ __name(function(t, e) {
    r(t).set_onmessage(r(e));
  }, "__wbg_set_onmessage_4267515727ed4c68"), __wbg_set_onmessage_9d59339e7810516a: /* @__PURE__ */ __name(function(t, e) {
    r(t).onmessage = r(e);
  }, "__wbg_set_onmessage_9d59339e7810516a"), __wbg_set_status_384b9a831b2c0723: /* @__PURE__ */ __name(function(t, e) {
    r(t).status = e;
  }, "__wbg_set_status_384b9a831b2c0723"), __wbg_set_type_8b2743f6b4de4035: /* @__PURE__ */ __name(function(t, e, n) {
    r(t).type = g(e, n);
  }, "__wbg_set_type_8b2743f6b4de4035"), __wbg_set_type_eb724b65eb86ef17: /* @__PURE__ */ __name(function(t, e) {
    r(t).type = gt[e];
  }, "__wbg_set_type_eb724b65eb86ef17"), __wbg_signal_d432155bd3558cd0: /* @__PURE__ */ __name(function(t) {
    let e = r(t).signal;
    return i(e);
  }, "__wbg_signal_d432155bd3558cd0"), __wbg_stack_3b0d974bbf31e44f: /* @__PURE__ */ __name(function(t, e) {
    let n = r(e).stack, o = x(n, s.__wbindgen_export, s.__wbindgen_export2), c = p;
    a().setInt32(t + 4, c, true), a().setInt32(t + 0, o, true);
  }, "__wbg_stack_3b0d974bbf31e44f"), __wbg_static_accessor_GLOBAL_8cfadc87a297ca02: /* @__PURE__ */ __name(function() {
    let t = typeof global > "u" ? null : global;
    return w(t) ? 0 : i(t);
  }, "__wbg_static_accessor_GLOBAL_8cfadc87a297ca02"), __wbg_static_accessor_GLOBAL_THIS_602256ae5c8f42cf: /* @__PURE__ */ __name(function() {
    let t = typeof globalThis > "u" ? null : globalThis;
    return w(t) ? 0 : i(t);
  }, "__wbg_static_accessor_GLOBAL_THIS_602256ae5c8f42cf"), __wbg_static_accessor_INIT_STATE_64fa719d0e4673b7: /* @__PURE__ */ __name(function() {
    return i($);
  }, "__wbg_static_accessor_INIT_STATE_64fa719d0e4673b7"), __wbg_static_accessor_SELF_e445c1c7484aecc3: /* @__PURE__ */ __name(function() {
    let t = typeof self > "u" ? null : self;
    return w(t) ? 0 : i(t);
  }, "__wbg_static_accessor_SELF_e445c1c7484aecc3"), __wbg_static_accessor_WINDOW_f20e8576ef1e0f17: /* @__PURE__ */ __name(function() {
    let t = typeof window > "u" ? null : window;
    return w(t) ? 0 : i(t);
  }, "__wbg_static_accessor_WINDOW_f20e8576ef1e0f17"), __wbg_target_6d97e221d11b71b6: /* @__PURE__ */ __name(function(t) {
    let e = r(t).target;
    return w(e) ? 0 : i(e);
  }, "__wbg_target_6d97e221d11b71b6"), __wbg_textContent_1f28330a124ec047: /* @__PURE__ */ __name(function(t, e) {
    let n = r(e).textContent;
    var o = w(n) ? 0 : x(n, s.__wbindgen_export, s.__wbindgen_export2), c = p;
    a().setInt32(t + 4, c, true), a().setInt32(t + 0, o, true);
  }, "__wbg_textContent_1f28330a124ec047"), __wbg_then_792e0c862b060889: /* @__PURE__ */ __name(function(t, e, n) {
    let o = r(t).then(r(e), r(n));
    return i(o);
  }, "__wbg_then_792e0c862b060889"), __wbg_then_8e16ee11f05e4827: /* @__PURE__ */ __name(function(t, e) {
    let n = r(t).then(r(e));
    return i(n);
  }, "__wbg_then_8e16ee11f05e4827"), __wbg_toString_306ed0b9f320c1ca: /* @__PURE__ */ __name(function(t) {
    let e = r(t).toString();
    return i(e);
  }, "__wbg_toString_306ed0b9f320c1ca"), __wbg_toString_6dc1a94e0bdba378: /* @__PURE__ */ __name(function(t) {
    let e = r(t).toString();
    return i(e);
  }, "__wbg_toString_6dc1a94e0bdba378"), __wbg_url_94ef047be3ab790a: /* @__PURE__ */ __name(function(t, e) {
    let n = r(e).url, o = x(n, s.__wbindgen_export, s.__wbindgen_export2), c = p;
    a().setInt32(t + 4, c, true), a().setInt32(t + 0, o, true);
  }, "__wbg_url_94ef047be3ab790a"), __wbg_value_6079dd28568d83c9: /* @__PURE__ */ __name(function(t, e) {
    let n = r(e).value, o = x(n, s.__wbindgen_export, s.__wbindgen_export2), c = p;
    a().setInt32(t + 4, c, true), a().setInt32(t + 0, o, true);
  }, "__wbg_value_6079dd28568d83c9"), __wbg_value_ee3a06f4579184fa: /* @__PURE__ */ __name(function(t) {
    let e = r(t).value;
    return i(e);
  }, "__wbg_value_ee3a06f4579184fa"), __wbg_view_701664ffb3b1ce67: /* @__PURE__ */ __name(function(t) {
    let e = r(t).view;
    return w(e) ? 0 : i(e);
  }, "__wbg_view_701664ffb3b1ce67"), __wbg_warn_3a37cdd7216f1479: /* @__PURE__ */ __name(function(t, e) {
    var n = C(t, e).slice();
    s.__wbindgen_export4(t, e * 4, 4), console.warn(...n);
  }, "__wbg_warn_3a37cdd7216f1479"), __wbg_writable_cf068ecc1c511b93: /* @__PURE__ */ __name(function(t) {
    let e = r(t).writable;
    return i(e);
  }, "__wbg_writable_cf068ecc1c511b93"), __wbindgen_cast_0000000000000001: /* @__PURE__ */ __name(function(t, e) {
    let n = I(t, e, ot);
    return i(n);
  }, "__wbindgen_cast_0000000000000001"), __wbindgen_cast_0000000000000002: /* @__PURE__ */ __name(function(t, e) {
    let n = I(t, e, it);
    return i(n);
  }, "__wbindgen_cast_0000000000000002"), __wbindgen_cast_0000000000000003: /* @__PURE__ */ __name(function(t, e) {
    let n = I(t, e, ft);
    return i(n);
  }, "__wbindgen_cast_0000000000000003"), __wbindgen_cast_0000000000000004: /* @__PURE__ */ __name(function(t, e) {
    let n = I(t, e, st);
    return i(n);
  }, "__wbindgen_cast_0000000000000004"), __wbindgen_cast_0000000000000005: /* @__PURE__ */ __name(function(t, e) {
    let n = I(t, e, ct);
    return i(n);
  }, "__wbindgen_cast_0000000000000005"), __wbindgen_cast_0000000000000006: /* @__PURE__ */ __name(function(t, e) {
    let n = I(t, e, ut);
    return i(n);
  }, "__wbindgen_cast_0000000000000006"), __wbindgen_cast_0000000000000007: /* @__PURE__ */ __name(function(t, e) {
    let n = I(t, e, _t);
    return i(n);
  }, "__wbindgen_cast_0000000000000007"), __wbindgen_cast_0000000000000008: /* @__PURE__ */ __name(function(t) {
    return i(t);
  }, "__wbindgen_cast_0000000000000008"), __wbindgen_cast_0000000000000009: /* @__PURE__ */ __name(function(t, e) {
    let n = g(t, e);
    return i(n);
  }, "__wbindgen_cast_0000000000000009"), __wbindgen_cast_000000000000000a: /* @__PURE__ */ __name(function(t) {
    let e = BigInt.asUintN(64, t);
    return i(e);
  }, "__wbindgen_cast_000000000000000a"), __wbindgen_object_clone_ref: /* @__PURE__ */ __name(function(t) {
    let e = r(t);
    return i(e);
  }, "__wbindgen_object_clone_ref"), __wbindgen_object_drop_ref: /* @__PURE__ */ __name(function(t) {
    h(t);
  }, "__wbindgen_object_drop_ref") } };
}
__name(et, "et");
function u() {
  if (nt) {
    D();
    return;
  }
}
__name(u, "u");
function _t(_2, t) {
  u(), s.__wasm_bindgen_func_elem_16046(_2, t);
}
__name(_t, "_t");
function ot(_2, t, e) {
  u(), s.__wasm_bindgen_func_elem_16047(_2, t, i(e));
}
__name(ot, "ot");
function it(_2, t, e) {
  u(), s.__wasm_bindgen_func_elem_17987(_2, t, i(e));
}
__name(it, "it");
function st(_2, t, e) {
  u(), s.__wasm_bindgen_func_elem_16047_3(_2, t, i(e));
}
__name(st, "st");
function ct(_2, t, e) {
  u(), s.__wasm_bindgen_func_elem_17004(_2, t, i(e));
}
__name(ct, "ct");
function ut(_2, t, e) {
  u(), s.__wasm_bindgen_func_elem_5024(_2, t, i(e));
}
__name(ut, "ut");
function ft(_2, t, e) {
  try {
    let c = s.__wbindgen_add_to_stack_pointer(-16);
    u(), s.__wasm_bindgen_func_elem_20798(c, _2, t, i(e));
    var n = a().getInt32(c + 0, true), o = a().getInt32(c + 4, true);
    if (o) throw h(n);
  } finally {
    s.__wbindgen_add_to_stack_pointer(16);
  }
}
__name(ft, "ft");
function at(_2, t, e, n) {
  u(), s.__wasm_bindgen_func_elem_20808(_2, t, i(e), i(n));
}
__name(at, "at");
var bt = ["bytes"];
var dt = ["follow", "error", "manual"];
var gt = ["classic", "module"];
var b = 0;
var wt = typeof FinalizationRegistry > "u" ? { register: /* @__PURE__ */ __name(() => {
}, "register"), unregister: /* @__PURE__ */ __name(() => {
}, "unregister") } : new FinalizationRegistry(({ ptr: _2, instance: t }) => {
  t === b && s.__wbg_containerstartupoptions_free(_2 >>> 0, 1);
});
var lt = typeof FinalizationRegistry > "u" ? { register: /* @__PURE__ */ __name(() => {
}, "register"), unregister: /* @__PURE__ */ __name(() => {
}, "unregister") } : new FinalizationRegistry(({ ptr: _2, instance: t }) => {
  t === b && s.__wbg_intounderlyingbytesource_free(_2 >>> 0, 1);
});
var pt = typeof FinalizationRegistry > "u" ? { register: /* @__PURE__ */ __name(() => {
}, "register"), unregister: /* @__PURE__ */ __name(() => {
}, "unregister") } : new FinalizationRegistry(({ ptr: _2, instance: t }) => {
  t === b && s.__wbg_intounderlyingsink_free(_2 >>> 0, 1);
});
var K = typeof FinalizationRegistry > "u" ? { register: /* @__PURE__ */ __name(() => {
}, "register"), unregister: /* @__PURE__ */ __name(() => {
}, "unregister") } : new FinalizationRegistry(({ ptr: _2, instance: t }) => {
  t === b && s.__wbg_intounderlyingsource_free(_2 >>> 0, 1);
});
var ht = typeof FinalizationRegistry > "u" ? { register: /* @__PURE__ */ __name(() => {
}, "register"), unregister: /* @__PURE__ */ __name(() => {
}, "unregister") } : new FinalizationRegistry(({ ptr: _2, instance: t }) => {
  t === b && s.__wbg_minifyconfig_free(_2 >>> 0, 1);
});
var yt = typeof FinalizationRegistry > "u" ? { register: /* @__PURE__ */ __name(() => {
}, "register"), unregister: /* @__PURE__ */ __name(() => {
}, "unregister") } : new FinalizationRegistry(({ ptr: _2, instance: t }) => {
  t === b && s.__wbg_r2range_free(_2 >>> 0, 1);
});
function i(_2) {
  R === m.length && m.push(m.length + 1);
  let t = R;
  return R = m[t], m[t] = _2, t;
}
__name(i, "i");
var J = typeof FinalizationRegistry > "u" ? { register: /* @__PURE__ */ __name(() => {
}, "register"), unregister: /* @__PURE__ */ __name(() => {
}, "unregister") } : new FinalizationRegistry((_2) => {
  _2.instance === b && s.__wbindgen_export5(_2.a, _2.b);
});
function q(_2) {
  let t = typeof _2;
  if (t == "number" || t == "boolean" || _2 == null) return `${_2}`;
  if (t == "string") return `"${_2}"`;
  if (t == "symbol") {
    let o = _2.description;
    return o == null ? "Symbol" : `Symbol(${o})`;
  }
  if (t == "function") {
    let o = _2.name;
    return typeof o == "string" && o.length > 0 ? `Function(${o})` : "Function";
  }
  if (Array.isArray(_2)) {
    let o = _2.length, c = "[";
    o > 0 && (c += q(_2[0]));
    for (let d = 1; d < o; d++) c += ", " + q(_2[d]);
    return c += "]", c;
  }
  let e = /\[object ([^\]]+)\]/.exec(toString.call(_2)), n;
  if (e && e.length > 1) n = e[1];
  else return toString.call(_2);
  if (n == "Object") try {
    return "Object(" + JSON.stringify(_2) + ")";
  } catch {
    return "Object";
  }
  return _2 instanceof Error ? `${_2.name}: ${_2.message}
${_2.stack}` : n;
}
__name(q, "q");
function mt(_2) {
  _2 < 1028 || (m[_2] = R, R = _2);
}
__name(mt, "mt");
function C(_2, t) {
  _2 = _2 >>> 0;
  let e = a(), n = [];
  for (let o = _2; o < _2 + 4 * t; o += 4) n.push(h(e.getUint32(o, true)));
  return n;
}
__name(C, "C");
function B(_2, t) {
  return _2 = _2 >>> 0, T().subarray(_2 / 1, _2 / 1 + t);
}
__name(B, "B");
var E = null;
function a() {
  return (E === null || E.buffer.detached === true || E.buffer.detached === void 0 && E.buffer !== s.memory.buffer) && (E = new DataView(s.memory.buffer)), E;
}
__name(a, "a");
function g(_2, t) {
  return _2 = _2 >>> 0, vt(_2, t);
}
__name(g, "g");
var M = null;
function T() {
  return (M === null || M.byteLength === 0) && (M = new Uint8Array(s.memory.buffer)), M;
}
__name(T, "T");
function r(_2) {
  return m[_2];
}
__name(r, "r");
function f(_2, t) {
  try {
    return _2.apply(this, t);
  } catch (e) {
    s.__wbindgen_export3(i(e));
  }
}
__name(f, "f");
var m = new Array(1024).fill(void 0);
m.push(void 0, null, true, false);
var R = m.length;
function w(_2) {
  return _2 == null;
}
__name(w, "w");
function I(_2, t, e) {
  let n = { a: _2, b: t, cnt: 1, instance: b }, o = /* @__PURE__ */ __name((...c) => {
    if (n.instance !== b) throw new Error("Cannot invoke closure from previous WASM instance");
    n.cnt++;
    let d = n.a;
    n.a = 0;
    try {
      return e(d, n.b, ...c);
    } finally {
      n.a = d, o._wbg_cb_unref();
    }
  }, "o");
  return o._wbg_cb_unref = () => {
    --n.cnt === 0 && (s.__wbindgen_export5(n.a, n.b), n.a = 0, J.unregister(n));
  }, J.register(o, n, n), o;
}
__name(I, "I");
function xt(_2, t) {
  let e = t(_2.length * 4, 4) >>> 0, n = a();
  for (let o = 0; o < _2.length; o++) n.setUint32(e + 4 * o, i(_2[o]), true);
  return p = _2.length, e;
}
__name(xt, "xt");
function x(_2, t, e) {
  if (e === void 0) {
    let l = U.encode(_2), y = t(l.length, 1) >>> 0;
    return T().subarray(y, y + l.length).set(l), p = l.length, y;
  }
  let n = _2.length, o = t(n, 1) >>> 0, c = T(), d = 0;
  for (; d < n; d++) {
    let l = _2.charCodeAt(d);
    if (l > 127) break;
    c[o + d] = l;
  }
  if (d !== n) {
    d !== 0 && (_2 = _2.slice(d)), o = e(o, n, n = d + _2.length * 3, 1) >>> 0;
    let l = T().subarray(o + d, o + n), y = U.encodeInto(_2, l);
    d += y.written, o = e(o, n, d, 1) >>> 0;
  }
  return p = d, o;
}
__name(x, "x");
var nt = false;
function h(_2) {
  let t = r(_2);
  return mt(_2), t;
}
__name(h, "h");
var rt = new TextDecoder("utf-8", { ignoreBOM: true, fatal: true });
rt.decode();
function vt(_2, t) {
  return rt.decode(T().subarray(_2, _2 + t));
}
__name(vt, "vt");
var U = new TextEncoder();
"encodeInto" in U || (U.encodeInto = function(_2, t) {
  let e = U.encode(_2);
  return t.set(e), { read: _2.length, written: e.length };
});
var p = 0;
var It = new WebAssembly.Instance(G, et());
var s = It.exports;
s.__wbindgen_start();
Error.stackTraceLimit = 100;
var v = X();
function H() {
  v.criticalError && (console.log("Reinitializing Wasm application"), D(), v.criticalError = false, v.instanceId++);
}
__name(H, "H");
addEventListener("error", (_2) => {
  V(_2.error);
});
function V(_2) {
  _2 instanceof WebAssembly.RuntimeError && (console.error("Critical", _2), v.criticalError = true);
}
__name(V, "V");
var F = class extends Rt {
  static {
    __name(this, "F");
  }
};
F.prototype.WORKERS_CHANNEL_BertClassifierWorker = Q;
F.prototype.fetch = function(t) {
  return Y.call(this, t, this.env, this.ctx);
};
F.prototype.init = Z;
F.prototype.init_workers = tt;
var St = { set: /* @__PURE__ */ __name((_2, t, e, n) => Reflect.set(_2.instance, t, e, n), "set"), has: /* @__PURE__ */ __name((_2, t) => Reflect.has(_2.instance, t), "has"), deleteProperty: /* @__PURE__ */ __name((_2, t) => Reflect.deleteProperty(_2.instance, t), "deleteProperty"), apply: /* @__PURE__ */ __name((_2, t, e) => Reflect.apply(_2.instance, t, e), "apply"), construct: /* @__PURE__ */ __name((_2, t, e) => Reflect.construct(_2.instance, t, e), "construct"), getPrototypeOf: /* @__PURE__ */ __name((_2) => Reflect.getPrototypeOf(_2.instance), "getPrototypeOf"), setPrototypeOf: /* @__PURE__ */ __name((_2, t) => Reflect.setPrototypeOf(_2.instance, t), "setPrototypeOf"), isExtensible: /* @__PURE__ */ __name((_2) => Reflect.isExtensible(_2.instance), "isExtensible"), preventExtensions: /* @__PURE__ */ __name((_2) => Reflect.preventExtensions(_2.instance), "preventExtensions"), getOwnPropertyDescriptor: /* @__PURE__ */ __name((_2, t) => Reflect.getOwnPropertyDescriptor(_2.instance, t), "getOwnPropertyDescriptor"), defineProperty: /* @__PURE__ */ __name((_2, t, e) => Reflect.defineProperty(_2.instance, t, e), "defineProperty"), ownKeys: /* @__PURE__ */ __name((_2) => Reflect.ownKeys(_2.instance), "ownKeys") };
var j = { construct(_2, t, e) {
  try {
    H();
    let n = { instance: Reflect.construct(_2, t, e), instanceId: v.instanceId, ctor: _2, args: t, newTarget: e };
    return new Proxy(n, { ...St, get(o, c, d) {
      o.instanceId !== v.instanceId && (o.instance = Reflect.construct(o.ctor, o.args, o.newTarget), o.instanceId = v.instanceId);
      let l = Reflect.get(o.instance, c, d);
      return typeof l != "function" ? l : l.constructor === Function ? new Proxy(l, { apply(y, N, z) {
        H();
        try {
          return y.apply(N, z);
        } catch (P) {
          throw V(P), P;
        }
      } }) : new Proxy(l, { async apply(y, N, z) {
        H();
        try {
          return await y.apply(N, z);
        } catch (P) {
          throw V(P), P;
        }
      } });
    } });
  } catch (n) {
    throw v.criticalError = true, n;
  }
} };
var At = new Proxy(F, j);
var Ot = new Proxy(W, j);
var Lt = new Proxy(k, j);
var Pt = new Proxy(A, j);
var Ct = new Proxy(S, j);
var Mt = new Proxy(O, j);
var Tt = new Proxy(L, j);

// ../../../../.npm/_npx/32026684e21afda6/node_modules/wrangler/templates/middleware/middleware-ensure-req-body-drained.ts
var drainBody = /* @__PURE__ */ __name(async (request, env, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env);
  } finally {
    try {
      if (request.body !== null && !request.bodyUsed) {
        const reader = request.body.getReader();
        while (!(await reader.read()).done) {
        }
      }
    } catch (e) {
      console.error("Failed to drain the unused request body.", e);
    }
  }
}, "drainBody");
var middleware_ensure_req_body_drained_default = drainBody;

// ../../../../.npm/_npx/32026684e21afda6/node_modules/wrangler/templates/middleware/middleware-miniflare3-json-error.ts
function reduceError(e) {
  return {
    name: e?.name,
    message: e?.message ?? String(e),
    stack: e?.stack,
    cause: e?.cause === void 0 ? void 0 : reduceError(e.cause)
  };
}
__name(reduceError, "reduceError");
var jsonError = /* @__PURE__ */ __name(async (request, env, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env);
  } catch (e) {
    const error = reduceError(e);
    return Response.json(error, {
      status: 500,
      headers: { "MF-Experimental-Error-Stack": "true" }
    });
  }
}, "jsonError");
var middleware_miniflare3_json_error_default = jsonError;

// .wrangler/tmp/bundle-6ZEqKo/middleware-insertion-facade.js
var __INTERNAL_WRANGLER_MIDDLEWARE__ = [
  middleware_ensure_req_body_drained_default,
  middleware_miniflare3_json_error_default
];
var middleware_insertion_facade_default = At;

// ../../../../.npm/_npx/32026684e21afda6/node_modules/wrangler/templates/middleware/common.ts
var __facade_middleware__ = [];
function __facade_register__(...args) {
  __facade_middleware__.push(...args.flat());
}
__name(__facade_register__, "__facade_register__");
function __facade_invokeChain__(request, env, ctx, dispatch, middlewareChain) {
  const [head, ...tail] = middlewareChain;
  const middlewareCtx = {
    dispatch,
    next(newRequest, newEnv) {
      return __facade_invokeChain__(newRequest, newEnv, ctx, dispatch, tail);
    }
  };
  return head(request, env, ctx, middlewareCtx);
}
__name(__facade_invokeChain__, "__facade_invokeChain__");
function __facade_invoke__(request, env, ctx, dispatch, finalMiddleware) {
  return __facade_invokeChain__(request, env, ctx, dispatch, [
    ...__facade_middleware__,
    finalMiddleware
  ]);
}
__name(__facade_invoke__, "__facade_invoke__");

// .wrangler/tmp/bundle-6ZEqKo/middleware-loader.entry.ts
var __Facade_ScheduledController__ = class ___Facade_ScheduledController__ {
  constructor(scheduledTime, cron, noRetry) {
    this.scheduledTime = scheduledTime;
    this.cron = cron;
    this.#noRetry = noRetry;
  }
  static {
    __name(this, "__Facade_ScheduledController__");
  }
  #noRetry;
  noRetry() {
    if (!(this instanceof ___Facade_ScheduledController__)) {
      throw new TypeError("Illegal invocation");
    }
    this.#noRetry();
  }
};
function wrapExportedHandler(worker) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__ === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__.length === 0) {
    return worker;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__) {
    __facade_register__(middleware);
  }
  const fetchDispatcher = /* @__PURE__ */ __name(function(request, env, ctx) {
    if (worker.fetch === void 0) {
      throw new Error("Handler does not export a fetch() function.");
    }
    return worker.fetch(request, env, ctx);
  }, "fetchDispatcher");
  return {
    ...worker,
    fetch(request, env, ctx) {
      const dispatcher = /* @__PURE__ */ __name(function(type, init) {
        if (type === "scheduled" && worker.scheduled !== void 0) {
          const controller = new __Facade_ScheduledController__(
            Date.now(),
            init.cron ?? "",
            () => {
            }
          );
          return worker.scheduled(controller, env, ctx);
        }
      }, "dispatcher");
      return __facade_invoke__(request, env, ctx, dispatcher, fetchDispatcher);
    }
  };
}
__name(wrapExportedHandler, "wrapExportedHandler");
function wrapWorkerEntrypoint(klass) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__ === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__.length === 0) {
    return klass;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__) {
    __facade_register__(middleware);
  }
  return class extends klass {
    #fetchDispatcher = /* @__PURE__ */ __name((request, env, ctx) => {
      this.env = env;
      this.ctx = ctx;
      if (super.fetch === void 0) {
        throw new Error("Entrypoint class does not define a fetch() function.");
      }
      return super.fetch(request);
    }, "#fetchDispatcher");
    #dispatcher = /* @__PURE__ */ __name((type, init) => {
      if (type === "scheduled" && super.scheduled !== void 0) {
        const controller = new __Facade_ScheduledController__(
          Date.now(),
          init.cron ?? "",
          () => {
          }
        );
        return super.scheduled(controller);
      }
    }, "#dispatcher");
    fetch(request) {
      return __facade_invoke__(
        request,
        this.env,
        this.ctx,
        this.#dispatcher,
        this.#fetchDispatcher
      );
    }
  };
}
__name(wrapWorkerEntrypoint, "wrapWorkerEntrypoint");
var WRAPPED_ENTRY;
if (typeof middleware_insertion_facade_default === "object") {
  WRAPPED_ENTRY = wrapExportedHandler(middleware_insertion_facade_default);
} else if (typeof middleware_insertion_facade_default === "function") {
  WRAPPED_ENTRY = wrapWorkerEntrypoint(middleware_insertion_facade_default);
}
var middleware_loader_entry_default = WRAPPED_ENTRY;
export {
  Ot as ContainerStartupOptions,
  Lt as IntoUnderlyingByteSource,
  Pt as IntoUnderlyingSink,
  Ct as IntoUnderlyingSource,
  Mt as MinifyConfig,
  Tt as R2Range,
  __INTERNAL_WRANGLER_MIDDLEWARE__,
  middleware_loader_entry_default as default
};
//# sourceMappingURL=index.js.map
