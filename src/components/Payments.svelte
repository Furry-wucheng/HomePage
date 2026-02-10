<script lang="ts">
  import { onMount } from 'svelte';
  import Icon from '@iconify/svelte';

  interface Payment {
    id: string;
    name: string;
    icon: string;
    link: string;
    iconBg: string;
    ringColor: string;
  }

  let selectPayment = $state('');
  let isMobile = $state(false);
  let isSmallScreen = $state(false);
  let QRCodeStyling: any = $state(null);

  const payments: Payment[] = [
    {
      id: 'alipay',
      name: '支付宝',
      icon: 'simple-icons:alipay',
      link: 'https://qr.alipay.com/fkx16255v3zwdluks1njzaf',
      iconBg: 'bg-linear-to-br from-blue-500 to-blue-600',
      ringColor: 'ring-blue-500/50'
    },
    {
      id: 'wechat',
      name: '微信支付',
      icon: 'simple-icons:wechat',
      link: 'wxp://f2f085vwqGgbZRNf3NN9U9OYu5KCPgKzLTafhM6PX8220e3wKln3_BqE9EB_a4k52Yg0',
      iconBg: 'bg-linear-to-br from-green-500 to-green-600',
      ringColor: 'ring-green-500/50'
    },
    {
      id: 'qq',
      name: 'QQ 支付',
      icon: 'simple-icons:tencentqq',
      link: 'https://i.qianbao.qq.com/wallet/sqrcode.htm?m=tenpay&f=wallet&a=1&ac=CAEQjKObugkY_4zAqQZCIGFmODZmMDU4Njc5MGJiYWRjZGZiMDkyYzIyNzA4ZjI1_xxx_sign&u=2538000780&n=%E4%BA%91%E5%BD%92%E4%BD%95%E5%A4%84%E5%AF%BB',
      iconBg: 'bg-linear-to-br from-cyan-500 to-cyan-600',
      ringColor: 'ring-cyan-500/50'
    }
  ];

  onMount(() => {
    import('qr-code-styling').then((module) => {
      QRCodeStyling = module.default;
    });


    const checkScreen = () => {
      isSmallScreen = window.innerWidth < 640;
    };
    checkScreen();
    window.addEventListener('resize', checkScreen);
    return () => window.removeEventListener('resize', checkScreen);
    isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  });

  function handlePaymentClick(payment: Payment) {
    if (payment.id === 'alipay' && isMobile) {
      window.open(
        `alipays://platformapi/startapp?appId=09999988&qrcode=${encodeURIComponent(payment.link)}`,
        '_blank'
      );
      return;
    }

    if (payment.id === 'wechat' && isMobile) {
      window.location.href = payment.link;
      return;
    }

    if (selectPayment === payment.id) {
      selectPayment = '';
    } else {
      selectPayment = payment.id;
    }
  }

  function generateQRCode(element: HTMLElement, link: string) {
    if (!QRCodeStyling) {
      return { destroy() {} };
    }

    const qrCode = new QRCodeStyling({
      width: 220,
      height: 220,
      data: link,
      margin: 5,
      qrOptions: {
        typeNumber: 0,
        mode: 'Byte',
        errorCorrectionLevel: 'Q'
      },
      dotsOptions: {
        type: 'rounded',
        color: '#000000'
      },
      backgroundOptions: {
        color: '#ffffff'
      },
      cornersSquareOptions: {
        type: 'extra-rounded',
        color: '#000000'
      },
      cornersDotOptions: {
        type: 'dot',
        color: '#000000'
      }
    });
    
    qrCode.append(element);

    return {
      destroy() {
        element.innerHTML = '';
      }
    };
  }
</script>

<div class="w-full max-w-4xl mx-auto px-4 py-8">
  <div class="flex flex-col sm:flex-row gap-4 h-auto min-h-[160px] items-stretch">
    {#each payments as payment}
      {@const isSelected = selectPayment === payment.id}
      {@const hasSelection = selectPayment !== ''}
      {@const isHidden = hasSelection && !isSelected && !isSmallScreen}

      <!-- svelte-ignore a11y_click_events_have_key_events -->
      <div
        role="button"
        tabindex="0"
        class="relative flex flex-col items-center justify-center overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]
        rounded-2xl shadow-sm
        {isSelected 
          ? 'ring-2 ' + payment.ringColor + ' shadow-xl cursor-default bg-white/5 dark:bg-white/5 backdrop-blur-sm border border-white/20' 
          : ''}
        {isHidden 
          ? 'w-0 opacity-0 p-0 border-0 m-0 overflow-hidden' 
          : 'p-6 bg-white/5 dark:bg-white/5 backdrop-blur-sm border border-white/20 hover:shadow-lg hover:bg-white/10 dark:hover:bg-white/15 cursor-pointer'}
        {!hasSelection ? 'flex-1 hover:-translate-y-1' : ''}
        {isSelected ? 'flex-[10]' : ''}"
        style="
          {isHidden ? 'flex-grow: 0 !important; width: 0 !important; min-width: 0 !important; padding: 0 !important; opacity: 0;' : ''}
          {isSelected ? 'min-height: 400px;' : 'min-height: 148px;'}
        "
        onclick={() => handlePaymentClick(payment)}
        onkeydown={(e) => (e.key === 'Enter' || e.key === ' ') && handlePaymentClick(payment)}
      >
        <!-- 未展开状态 - 只在未选中且不隐藏时显示 -->
        {#if !isSelected && !isHidden}
          <div class="flex flex-col items-center gap-4 min-w-[120px]">
            <div class="w-16 h-16 rounded-full {payment.iconBg} flex items-center justify-center shadow-lg transition-transform duration-300">
              <Icon icon={payment.icon} class="text-white" width="32" height="32" />
            </div>
            <span class="text-base font-semibold text-gray-800 dark:text-gray-200 whitespace-nowrap">
              {payment.name}
            </span>
          </div>
        {/if}

        <!-- 展开状态 - 只在选中时显示 -->
        {#if isSelected}
          <div class="absolute inset-0 flex flex-col items-center justify-center p-6 animate-fade-in">
            <button
              class="absolute top-4 right-4 w-8 h-8 flex items-center justify-center bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/15 rounded-full transition-all duration-200 hover:rotate-90 z-20"
              onclick={(e) => { e.stopPropagation(); selectPayment = ''; }}
            >
              <Icon icon="lucide:x" width="18" height="18" class="text-gray-600 dark:text-gray-300" />
            </button>
            
            <div class="flex flex-col items-center gap-6 w-full animate-scale-in max-w-sm">
              <div class="flex flex-col items-center gap-2">
                 <h3 class="text-xl font-bold text-gray-800 dark:text-white">{payment.name}</h3>
                 <p class="text-sm text-gray-500 dark:text-gray-400">
                   {isMobile ? '长按保存二维码' : '扫码支付'}
                 </p>
              </div>
              
              <div class="bg-white rounded-xl p-3 shadow-xl">
                <div use:generateQRCode={payment.link}></div>
              </div>
            </div>
          </div>
        {/if}
      </div>
    {/each}
  </div>
</div>

<style>
  @keyframes fade-in {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes scale-in {
    0% {
      opacity: 0;
      transform: scale(0.7) translateY(20px);
    }
    60% {
      transform: scale(1.05) translateY(-5px);
    }
    100% {
      opacity: 1;
      transform: scale(1) translateY(0);
    }
  }

  .animate-fade-in {
    animation: fade-in 0.3s ease-out;
  }

  .animate-scale-in {
    animation: scale-in 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
  }
</style>
