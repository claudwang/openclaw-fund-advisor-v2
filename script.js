// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 初始化导航栏滚动效果
    initNavbarScroll();
    
    // 初始化复制功能
    initCopyButtons();
    
    // 初始化标签页功能
    initTabs();
    
    // 初始化滚动动画
    initScrollAnimations();
    
    // 初始化简单的图表演示
    initDemoCharts();
});

// 导航栏滚动效果
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }

        // 隐藏/显示导航栏效果
        if (window.scrollY > lastScrollY && window.scrollY > 100) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollY = window.scrollY;
    });
}

// 复制到剪贴板功能
function initCopyButtons() {
    const copyButtons = document.querySelectorAll('.copy-btn');
    
    copyButtons.forEach(button => {
        button.addEventListener('click', function() {
            const codeId = this.getAttribute('onclick').match(/'([^']+)'/)[1];
            const codeElement = document.getElementById(codeId);
            const codeText = codeElement.textContent;
            
            navigator.clipboard.writeText(codeText).then(() => {
                // 显示复制成功提示
                const originalIcon = this.innerHTML;
                this.innerHTML = '<i class="fas fa-check"></i>';
                this.style.background = '#22c55e';
                
                setTimeout(() => {
                    this.innerHTML = originalIcon;
                    this.style.background = '';
                }, 2000);
            }).catch(err => {
                console.error('复制失败:', err);
            });
        });
    });
}

// 标签页功能
function initTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tabId = this.getAttribute('onclick').match(/'([^']+)'/)[1];
            
            // 移除所有激活状态
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // 激活当前标签
            this.classList.add('active');
            document.getElementById(tabId).classList.add('active');
        });
    });
}

// 滚动到指定区域
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const navbarHeight = document.querySelector('.navbar').offsetHeight;
        const targetPosition = section.offsetTop - navbarHeight - 20;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
}

// 滚动动画效果
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // 为需要动画的元素添加观察
    const animatedElements = document.querySelectorAll('.feature-card, .step, .demo-container');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// 简单的图表演示
function initDemoCharts() {
    const marketChartCanvas = document.getElementById('marketChart');
    if (marketChartCanvas) {
        // 创建模拟图表数据
        const ctx = marketChartCanvas.getContext('2d');
        
        // 设置canvas尺寸
        marketChartCanvas.width = marketChartCanvas.offsetWidth;
        marketChartCanvas.height = marketChartCanvas.offsetHeight;
        
        // 绘制简单折线图
        const data = [65, 59, 80, 81, 56, 55, 40, 65, 59, 80, 81, 56];
        const maxValue = Math.max(...data);
        const minValue = Math.min(...data);
        const width = marketChartCanvas.width;
        const height = marketChartCanvas.height;
        const padding = 40;
        
        // 清除canvas
        ctx.clearRect(0, 0, width, height);
        
        // 绘制网格线
        ctx.strokeStyle = '#e2e8f0';
        ctx.lineWidth = 1;
        
        // 水平网格线
        for (let i = 0; i <= 4; i++) {
            const y = padding + (height - 2 * padding) * i / 4;
            ctx.beginPath();
            ctx.moveTo(padding, y);
            ctx.lineTo(width - padding, y);
            ctx.stroke();
        }
        
        // 绘制折线
        ctx.strokeStyle = '#2563eb';
        ctx.lineWidth = 3;
        ctx.beginPath();
        
        data.forEach((value, index) => {
            const x = padding + (width - 2 * padding) * index / (data.length - 1);
            const y = height - padding - (value - minValue) / (maxValue - minValue) * (height - 2 * padding);
            
            if (index === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        });
        
        ctx.stroke();
        
        // 绘制数据点
        ctx.fillStyle = '#2563eb';
        data.forEach((value, index) => {
            const x = padding + (width - 2 * padding) * index / (data.length - 1);
            const y = height - padding - (value - minValue) / (maxValue - minValue) * (height - 2 * padding);
            
            ctx.beginPath();
            ctx.arc(x, y, 4, 0, 2 * Math.PI);
            ctx.fill();
        });
    }
}

// 标签页切换函数（供HTML调用）
function openTab(tabName) {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    // 移除所有激活状态
    tabButtons.forEach(btn => btn.classList.remove('active'));
    tabContents.forEach(content => content.classList.remove('active'));
    
    // 激活当前标签
    const activeButton = Array.from(tabButtons).find(btn => 
        btn.getAttribute('onclick').includes(tabName)
    );
    const activeContent = document.getElementById(tabName);
    
    if (activeButton && activeContent) {
        activeButton.classList.add('active');
        activeContent.classList.add('active');
    }
}

// 复制函数（供HTML调用）
function copyToClipboard(elementId) {
    const element = document.getElementById(elementId);
    const text = element.textContent;
    
    navigator.clipboard.writeText(text).then(() => {
        // 显示复制成功提示
        const button = element.nextElementSibling;
        const originalIcon = button.innerHTML;
        button.innerHTML = '<i class="fas fa-check"></i>';
        button.style.background = '#22c55e';
        
        setTimeout(() => {
            button.innerHTML = originalIcon;
            button.style.background = '';
        }, 2000);
    }).catch(err => {
        console.error('复制失败:', err);
    });
}

// 响应窗口大小变化
window.addEventListener('resize', function() {
    initDemoCharts();
});

// 添加键盘快捷键支持
document.addEventListener('keydown', function(e) {
    // Ctrl/Cmd + K 聚焦搜索（如果有搜索功能的话）
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        // 可以添加搜索功能
    }
});

// 添加页面性能监控（可选）
if ('performance' in window) {
    window.addEventListener('load', function() {
        const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
        console.log(`页面加载时间: ${loadTime}ms`);
    });
}

// 错误处理
window.addEventListener('error', function(e) {
    console.error('页面错误:', e.error);
});

// 添加平滑滚动到锚点
const anchorLinks = document.querySelectorAll('a[href^="#"]');
anchorLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        scrollToSection(targetId);
    });
});