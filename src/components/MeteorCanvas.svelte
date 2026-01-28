<script lang="ts">
  import { onMount } from 'svelte';

  let canvas: HTMLCanvasElement;
  let ctx: CanvasRenderingContext2D | null;
  let animationFrameId: number;

  interface Meteor {
    radius: number; // 粒子大小
    hue: number; // 用于生成颜色
    orbitRadius: number; // 距离中心点的距离
    angle: number; // 当前角度
    angularSpeed: number; // 旋转速度
  }

  let meteors: Meteor[] = [];

  function resize() {
    if (!canvas) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  function createMeteor(isInit = false): Meteor {
    const maxDim = Math.max(window.innerWidth, window.innerHeight);
    // 覆盖整个屏幕，包括角落，并增加一些缓冲区
    const orbitRadius = Math.random() * (maxDim * 1.5); 
    
    // 使用 HSL 生成随机鲜艳颜色
    // 色相: 0-360, 饱和度: 70-100%, 亮度: 50-80%
    const hue = Math.floor(Math.random() * 360);
    
    // --- 配置区域 (CONFIG) ---
    // 初始角度范围
    const startAngle = -Math.PI / 10 ; // 从上方开始（-18度）
    const endAngle = Math.PI / 2 + Math.PI / 18; // 到左侧下方结束 (100度)

    let angle;
    if (isInit) {
        // 初始化时：随机分布在整个轨迹上，避免开局空白
        angle = startAngle + Math.random() * (endAngle - startAngle);
    } else {
        // 重生时：必须从起点（屏幕上方）开始
        angle = startAngle + Math.random() * (Math.PI / 18); // 在起点附近带有微小随机偏移
    }

    return {
      radius: Math.random() * 1.5 + 2, // [参数] 粒子大小范围
      hue: hue,
      orbitRadius: orbitRadius,
      angle: angle,
      angularSpeed: (0.0005 + Math.random() * 0.001), // [参数] 旋转速度 (顺时针)
    };
  }

  function initMeteors(count: number) {
    meteors = [];
    for (let i = 0; i < count; i++) {
        meteors.push(createMeteor(true)); // 传入 true 表示这是初始化阶段
    }
  }

  function animate() {
    if (!ctx || !canvas) return;
    
    // 使用 destination-out 实现拖尾效果
    // 这种方式会每一帧减淡所有内容的透明度，从而形成拖尾
    ctx.save();
    ctx.globalCompositeOperation = 'destination-out';
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)'; // [参数] 拖尾消失速度，值越小拖尾越长 (0.05 - 0.2)
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.restore();

    // 原点设为左上角 (0,0)
    const originX = 0;
    const originY = 0;
    
    // 角度限制：100度 (超出此角度则回收)
    const maxAngle = 100 * (Math.PI / 180);

    meteors.forEach((meteor, index) => {
        // 生命周期管理：如果角度超过100度，重新生成
        // 这样可以确保粒子在离开可视区域（右下角往左下）后被回收
        // 并在新的尺寸下重新生成在随机位置
        if (meteor.angle > maxAngle) {
            meteors[index] = createMeteor(false);
            return;
        }

        // 更新角度
        meteor.angle += meteor.angularSpeed;

        // 计算当前位置
        const x = originX + Math.cos(meteor.angle) * meteor.orbitRadius;
        const y = originY + Math.sin(meteor.angle) * meteor.orbitRadius;

        // 绘制流星
        // 简单淡出：接近100度时淡出
        const opacity = meteor.angle > (Math.PI / 2) ? 1 - (meteor.angle - Math.PI / 2) / (maxAngle - Math.PI / 2) : 1;
        
        ctx!.beginPath();
        ctx!.shadowBlur = 1; // 性能优化：如果需要光晕可以调整这里，但会影响性能
        ctx!.globalCompositeOperation = 'source-over'; // 确保绘制是覆盖模式
        ctx!.arc(x, y, meteor.radius, 0, Math.PI * 2);
        ctx!.fillStyle = `hsla(${meteor.hue}, 80%, 65%, ${opacity})`;
        ctx!.fill();
    });

    animationFrameId = requestAnimationFrame(animate);
  }

  onMount(() => {
    ctx = canvas.getContext('2d');
    resize();
    window.addEventListener('resize', resize);
    
    // [配置] 流星数量
    initMeteors(400); 
    
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  });
</script>

<canvas
  bind:this={canvas}
  class="fixed inset-0 z-0 pointer-events-none opacity-60"
></canvas>
