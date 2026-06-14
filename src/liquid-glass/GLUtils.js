export class ShaderProgram {
  gl;
  program;
  uniforms = /* @__PURE__ */ new Map();
  attributes = /* @__PURE__ */ new Map();
  constructor(gl, source) {
    this.gl = gl;
    this.program = this.createProgram(source);
    this.detectAttributes();
    this.detectUniforms();
  }
  createShader(type, source) {
    const gl = this.gl;
    const shader = gl.createShader(type);
    if (!shader) throw new Error("Failed to create shader");
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      const info = gl.getShaderInfoLog(shader);
      gl.deleteShader(shader);
      throw new Error(`Shader compile error: ${info}`);
    }
    return shader;
  }
  createProgram(source) {
    const gl = this.gl;
    const program = gl.createProgram();
    if (!program) throw new Error("Failed to create program");
    const vertexShader = this.createShader(gl.VERTEX_SHADER, source.vertex);
    const fragmentShader = this.createShader(
      gl.FRAGMENT_SHADER,
      source.fragment
    );
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      const info = gl.getProgramInfoLog(program);
      gl.deleteProgram(program);
      throw new Error(`Program link error: ${info}`);
    }
    gl.deleteShader(vertexShader);
    gl.deleteShader(fragmentShader);
    return program;
  }
  detectAttributes() {
    const gl = this.gl;
    const numAttributes = gl.getProgramParameter(
      this.program,
      gl.ACTIVE_ATTRIBUTES
    );
    for (let i = 0; i < numAttributes; i++) {
      const info = gl.getActiveAttrib(this.program, i);
      if (!info) continue;
      const location = gl.getAttribLocation(this.program, info.name);
      this.attributes.set(info.name, {
        location,
        size: info.size,
        type: info.type
      });
    }
  }
  detectUniforms() {
    const gl = this.gl;
    const numUniforms = gl.getProgramParameter(
      this.program,
      gl.ACTIVE_UNIFORMS
    );
    for (let i = 0; i < numUniforms; i++) {
      const info = gl.getActiveUniform(this.program, i);
      if (!info) continue;
      const location = gl.getUniformLocation(this.program, info.name);
      if (!location) continue;
      const originalName = info.name;
      const arrayRegex = /\[\d+\]$/;
      if (arrayRegex.test(originalName)) {
        const baseName = originalName.replace(arrayRegex, "");
        this.uniforms.set(baseName, {
          location,
          type: info.type,
          value: null,
          isArray: {
            size: info.size
          }
        });
      } else {
        this.uniforms.set(info.name, {
          location,
          type: info.type,
          value: null,
          isArray: false
        });
      }
    }
  }
  use() {
    this.gl.useProgram(this.program);
  }
  setUniform(name, value) {
    const gl = this.gl;
    const uniformInfo = this.uniforms.get(name);
    if (!uniformInfo) return;
    const location = uniformInfo.location;
    if (uniformInfo.isArray && Array.isArray(value)) {
      switch (uniformInfo.type) {
        case gl.FLOAT:
          gl.uniform1fv(uniformInfo.location, value);
          break;
        case gl.FLOAT_VEC2:
          gl.uniform2fv(uniformInfo.location, value);
          break;
        case gl.FLOAT_VEC3:
          gl.uniform3fv(uniformInfo.location, value);
          break;
        case gl.FLOAT_VEC4:
          gl.uniform4fv(uniformInfo.location, value);
          break;
      }
    } else {
      switch (uniformInfo.type) {
        case gl.FLOAT:
          gl.uniform1f(location, value);
          break;
        case gl.FLOAT_VEC2:
          gl.uniform2fv(location, value);
          break;
        case gl.FLOAT_VEC3:
          gl.uniform3fv(location, value);
          break;
        case gl.FLOAT_VEC4:
          gl.uniform4fv(location, value);
          break;
        case gl.INT:
          gl.uniform1i(location, value);
          break;
        case gl.SAMPLER_2D:
          gl.uniform1i(location, value);
          break;
        case gl.FLOAT_MAT3:
          gl.uniformMatrix3fv(location, false, value);
          break;
        case gl.FLOAT_MAT4:
          gl.uniformMatrix4fv(location, false, value);
          break;
      }
    }
  }
  getAttributeLocation(name) {
    const attribute = this.attributes.get(name);
    return attribute ? attribute.location : -1;
  }
  dispose() {
    const gl = this.gl;
    if (this.program) {
      const shaders = gl.getAttachedShaders(this.program);
      if (shaders) {
        shaders.forEach((shader) => {
          gl.deleteShader(shader);
        });
      }
      gl.deleteProgram(this.program);
    }
    this.uniforms.clear();
    this.attributes.clear();
  }
}
export class FrameBuffer {
  gl;
  fbo;
  texture;
  depthTexture;
  width;
  height;
  constructor(gl, width, height) {
    this.gl = gl;
    this.width = width;
    this.height = height;
    const { fbo, texture, depthTexture } = this.createFramebuffer();
    this.fbo = fbo;
    this.texture = texture;
    this.depthTexture = depthTexture;
  }
  createFramebuffer() {
    const gl = this.gl;
    const fbo = gl.createFramebuffer();
    if (!fbo) throw new Error("Failed to create framebuffer");
    gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
    const texture = gl.createTexture();
    if (!texture) throw new Error("Failed to create texture");
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texImage2D(
      gl.TEXTURE_2D,
      0,
      gl.RGBA16F,
      this.width,
      this.height,
      0,
      gl.RGBA,
      gl.FLOAT,
      null
    );
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.framebufferTexture2D(
      gl.FRAMEBUFFER,
      gl.COLOR_ATTACHMENT0,
      gl.TEXTURE_2D,
      texture,
      0
    );
    const depthTexture = gl.createTexture();
    if (!depthTexture) throw new Error("Failed to create depth texture");
    gl.bindTexture(gl.TEXTURE_2D, depthTexture);
    gl.texImage2D(
      gl.TEXTURE_2D,
      0,
      gl.DEPTH_COMPONENT24,
      this.width,
      this.height,
      0,
      gl.DEPTH_COMPONENT,
      gl.UNSIGNED_INT,
      null
    );
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    gl.framebufferTexture2D(
      gl.FRAMEBUFFER,
      gl.DEPTH_ATTACHMENT,
      gl.TEXTURE_2D,
      depthTexture,
      0
    );
    const status = gl.checkFramebufferStatus(gl.FRAMEBUFFER);
    if (status !== gl.FRAMEBUFFER_COMPLETE) {
      throw new Error(`Framebuffer is incomplete: ${status}`);
    }
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    gl.bindTexture(gl.TEXTURE_2D, null);
    return { fbo, texture, depthTexture };
  }
  bind() {
    this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, this.fbo);
  }
  unbind() {
    this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, null);
  }
  getTexture() {
    return this.texture;
  }
  getDepthTexture() {
    return this.depthTexture;
  }
  resize(width, height) {
    this.width = width;
    this.height = height;
    this.gl.bindTexture(this.gl.TEXTURE_2D, this.texture);
    this.gl.texImage2D(
      this.gl.TEXTURE_2D,
      0,
      this.gl.RGBA16F,
      width,
      height,
      0,
      this.gl.RGBA,
      this.gl.FLOAT,
      null
    );
    this.gl.bindTexture(this.gl.TEXTURE_2D, this.depthTexture);
    this.gl.texImage2D(
      this.gl.TEXTURE_2D,
      0,
      this.gl.DEPTH_COMPONENT24,
      width,
      height,
      0,
      this.gl.DEPTH_COMPONENT,
      this.gl.UNSIGNED_INT,
      null
    );
    this.gl.bindTexture(this.gl.TEXTURE_2D, null);
  }
  dispose() {
    const gl = this.gl;
    gl.deleteFramebuffer(this.fbo);
    gl.deleteTexture(this.texture);
    gl.deleteTexture(this.depthTexture);
  }
}
export class RenderPass {
  gl;
  program;
  frameBuffer;
  vao;
  config;
  constructor(gl, shaderSource, outputToScreen = false) {
    this.gl = gl;
    this.config = { name: "", shader: shaderSource };
    this.program = new ShaderProgram(gl, shaderSource);
    this.frameBuffer = !outputToScreen ? new FrameBuffer(gl, gl.canvas.width, gl.canvas.height) : null;
    this.vao = this.createVAO();
  }
  createVAO() {
    const gl = this.gl;
    const vao = gl.createVertexArray();
    if (!vao) throw new Error("Failed to create VAO");
    gl.bindVertexArray(vao);
    const buffer = gl.createBuffer();
    if (!buffer) throw new Error("Failed to create buffer");
    const vertices = new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]);
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
    const positionLoc = this.program.getAttributeLocation("a_position");
    gl.enableVertexAttribArray(positionLoc);
    gl.vertexAttribPointer(positionLoc, 2, gl.FLOAT, false, 0, 0);
    gl.bindVertexArray(null);
    gl.bindBuffer(gl.ARRAY_BUFFER, null);
    return vao;
  }
  setConfig(config) {
    this.config = config;
  }
  render(uniforms) {
    const gl = this.gl;
    if (this.frameBuffer) {
      this.frameBuffer.bind();
    } else {
      gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    }
    this.program.use();
    if (uniforms) {
      let textureCount = 0;
      Object.entries(uniforms).forEach(([name, value]) => {
        if (value instanceof WebGLTexture) {
          gl.activeTexture(gl.TEXTURE0 + textureCount);
          gl.bindTexture(gl.TEXTURE_2D, value);
          this.program.setUniform(name, textureCount);
          textureCount += 1;
        } else {
          this.program.setUniform(name, value);
        }
      });
    }
    gl.bindVertexArray(this.vao);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    gl.bindVertexArray(null);
    if (this.frameBuffer) {
      this.frameBuffer.unbind();
    }
  }
  getOutputTexture() {
    return this.frameBuffer ? this.frameBuffer.getTexture() : null;
  }
  resize(width, height) {
    if (this.frameBuffer) {
      this.frameBuffer.resize(width, height);
    }
  }
  dispose() {
    if (this.frameBuffer) {
      this.frameBuffer.dispose();
    }
    this.program.dispose();
    const gl = this.gl;
    gl.bindVertexArray(this.vao);
    const buffer = gl.getVertexAttrib(0, gl.VERTEX_ATTRIB_ARRAY_BUFFER_BINDING);
    gl.bindBuffer(gl.ARRAY_BUFFER, null);
    gl.deleteBuffer(buffer);
    gl.deleteVertexArray(this.vao);
  }
}
export class MultiPassRenderer {
  gl;
  passes = /* @__PURE__ */ new Map();
  passesArray = [];
  globalUniforms = {};
  constructor(canvas, configs) {
    const gl = canvas.getContext("webgl2");
    if (!gl) throw new Error("WebGL 2 not supported");
    const ext = gl.getExtension("EXT_color_buffer_float");
    if (!ext) throw new Error("EXT_color_buffer_float not supported");
    this.gl = gl;
    const passesArray = [];
    for (const [index, cfg] of configs.entries()) {
      const pass = new RenderPass(gl, cfg.shader, cfg.outputToScreen);
      pass.setConfig(cfg);
      this.passes.set(cfg.name, pass);
      passesArray[index] = pass;
    }
    this.passesArray = passesArray;
  }
  resize(width, height) {
    this.passesArray.forEach((pass) => {
      pass.resize(width, height);
    });
  }
  /**
   * 设置全局uniform，将应用于所有渲染通道
   * @param name uniform名称
   * @param value uniform值
   */
  setUniform(name, value) {
    this.globalUniforms[name] = value;
  }
  /**
   * 批量设置全局uniforms
   * @param uniforms uniform对象
   */
  setUniforms(uniforms) {
    Object.assign(this.globalUniforms, uniforms);
  }
  /**
   * 清除特定的全局uniform
   * @param name uniform名称
   */
  clearUniform(name) {
    delete this.globalUniforms[name];
  }
  /**
   * 清除所有全局uniforms
   */
  clearAllUniforms() {
    this.globalUniforms = {};
  }
  render(passUniforms) {
    this.passesArray.forEach((pass, index) => {
      const uniforms = { ...this.globalUniforms };
      if (passUniforms) {
        if (Array.isArray(passUniforms)) {
          Object.assign(uniforms, passUniforms[index]);
        } else {
          Object.assign(uniforms, passUniforms[pass.config.name] ?? null);
        }
      }
      if (pass.config.inputs) {
        Object.entries(pass.config.inputs).forEach(([uniformName, fromPassName]) => {
          const fromPass = this.passes.get(fromPassName);
          uniforms[uniformName] = fromPass?.getOutputTexture();
        });
      }
      pass.render(uniforms);
    });
  }
  /**
     * 清理所有渲染资源
     */
  dispose() {
    const gl = this.gl;
    this.passes.forEach((pass) => {
      pass.dispose();
    });
    this.passes.clear();
    this.clearAllUniforms();
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    gl.bindTexture(gl.TEXTURE_2D, null);
  }
}
export function loadTextureFromURL(gl, url) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.crossOrigin = "";
    image.onload = () => {
      const texture = gl.createTexture();
      if (!texture) return reject("Failed to create texture");
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
      gl.texImage2D(
        gl.TEXTURE_2D,
        0,
        gl.RGBA,
        gl.RGBA,
        gl.UNSIGNED_BYTE,
        image
      );
      gl.generateMipmap(gl.TEXTURE_2D);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      resolve({ texture, ratio: image.naturalWidth / image.naturalHeight });
    };
    image.onerror = reject;
    image.src = url;
  });
}
export function createEmptyTexture(gl) {
  const texture = gl.createTexture();
  if (!texture) throw new Error("Failed to create texture");
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  return texture;
}
export function updateMediaTexture(gl, texture, media) {
  let width = media instanceof HTMLVideoElement ? media.videoWidth : media.width;
  let height = media instanceof HTMLVideoElement ? media.videoHeight : media.height;
  if (width === 0 || height === 0) return;
  let ratio = width / height;
  if (isNaN(ratio)) {
    ratio = 1;
  }
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
  gl.texImage2D(
    gl.TEXTURE_2D,
    0,
    gl.RGBA,
    gl.RGBA,
    gl.UNSIGNED_BYTE,
    media
  );
  gl.generateMipmap(gl.TEXTURE_2D);
  return {
    ratio
  };
}
