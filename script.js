// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 初始化所有功能
    initResponsiveNav();
    initSmoothScroll();
    initNavbarScroll();
    initPortfolioGallery();
    initLazyLoad();
    initParticles();
});

// 响应式导航菜单功能
function initResponsiveNav() {
    const navbarToggle = document.querySelector('.navbar-toggle');
    const navbarMenu = document.querySelector('.navbar-menu');
    
    if (navbarToggle && navbarMenu) {
        navbarToggle.addEventListener('click', function() {
            navbarMenu.classList.toggle('active');
            
            // 切换图标
            const icon = this.querySelector('i');
            if (icon.classList.contains('fa-bars')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
        
        // 点击导航链接后关闭菜单
        const navLinks = navbarMenu.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navbarMenu.classList.remove('active');
                const icon = navbarToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            });
        });
    }
}

// 平滑滚动功能
function initSmoothScroll() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.offsetTop - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// 导航栏滚动效果
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 100) {
                navbar.style.background = 'rgba(10, 10, 10, 0.98)';
                navbar.style.borderBottom = '1px solid #2a2a2a';
            } else {
                navbar.style.background = 'rgba(10, 10, 10, 0.95)';
                navbar.style.borderBottom = '1px solid #1a1a1a';
            }
        });
    }
}

// 作品集画廊功能
function initPortfolioGallery() {
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    // 作品分类筛选功能
    if (filterButtons.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // 移除所有按钮的active类
                filterButtons.forEach(btn => btn.classList.remove('active'));
                // 为当前按钮添加active类
                this.classList.add('active');
                
                const filterValue = this.getAttribute('data-filter');
                
                // 筛选作品
                portfolioItems.forEach(item => {
                    const itemCategory = item.getAttribute('data-category');
                    
                    if (filterValue === 'all' || itemCategory === filterValue) {
                        // 显示匹配的作品
                        item.style.display = 'block';
                        setTimeout(() => {
                            item.classList.remove('fade-out');
                            item.style.opacity = '1';
                            item.style.transform = 'scale(1)';
                        }, 50);
                    } else {
                        // 隐藏不匹配的作品
                        item.classList.add('fade-out');
                        setTimeout(() => {
                            item.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }
    
    // 添加点击放大查看功能（基础版）
    portfolioItems.forEach(item => {
        item.addEventListener('click', function() {
            const img = this.querySelector('img');
            if (img) {
                // 这里可以扩展为完整的图片查看器
                console.log('查看图片:', img.src);
                // 简单的提示
                alert('点击查看图片功能可以扩展为完整的图片查看器');
            }
        });
    });
    
    // 图片懒加载功能
    const images = document.querySelectorAll('img');
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '50px 0px'
    };
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // 加载图片
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                
                // 添加淡入动画
                img.style.opacity = '0';
                img.style.transition = 'opacity 0.5s ease';
                
                setTimeout(() => {
                    img.style.opacity = '1';
                }, 100);
                
                imageObserver.unobserve(img);
            }
        });
    }, observerOptions);
    
    images.forEach(img => {
        // 检查图片是否已经有src属性，如果没有，添加占位符
        if (!img.src || img.src === '') {
            img.src = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMjAwIiBmaWxsPSJub25lIj48cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iIzMzMyIvPjwvc3ZnPg==';
        }
        imageObserver.observe(img);
    });
}



// 粒子效果
function initParticles() {
    const container = document.createElement('div');
    container.classList.add('particles-container');
    document.body.appendChild(container);

    // 创建粒子
    const particleCount = 30;
    for (let i = 0; i < particleCount; i++) {
        createParticle(container);
    }
}

function createParticle(container) {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    
    // 随机位置和动画延迟
    particle.style.left = Math.random() * 100 + '%';
    particle.style.animationDelay = Math.random() * 10 + 's';
    particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
    
    // 随机颜色
    const colors = [
        'rgba(0, 200, 255, 0.5)',
        'rgba(150, 0, 255, 0.5)',
        'rgba(0, 255, 200, 0.5)',
        'rgba(255, 150, 0, 0.5)'
    ];
    particle.style.background = colors[Math.floor(Math.random() * colors.length)];
    
    container.appendChild(particle);
    
    // 粒子动画结束后重新创建
    particle.addEventListener('animationend', () => {
        particle.remove();
        createParticle(container);
    });
}



// 页面滚动动画 - 处理所有带有动画类的元素
function initScrollAnimations() {
    // 获取所有带有动画类的元素，包括新增的动画效果
    const animatedElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .scale-in, .fade-in-up, .slide-up');
    
    // 为同类元素添加递增延迟，创建交错动画效果
    const animateElementsByClass = (className, delayIncrement = 0.1) => {
        const elements = document.querySelectorAll(className);
        elements.forEach((element, index) => {
            element.style.transitionDelay = `${index * delayIncrement}s`;
        });
    };
    
    // 为作品集项目添加交错动画延迟
    animateElementsByClass('.portfolio-item', 0.1);
    
    // 为关于我部分的信息项添加交错动画延迟
    animateElementsByClass('.about-info-item', 0.15);
    
    // 为联系项添加交错动画延迟
    animateElementsByClass('.contact-item', 0.15);
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // 为元素添加visible类以触发动画
                entry.target.classList.add('visible');
                // 一旦动画触发，停止观察该元素以提高性能
                observer.unobserve(entry.target);
            }
        });
    }, {
        // 根据设备类型设置不同的阈值，移动端触发更早
        threshold: window.innerWidth < 768 ? 0.1 : 0.2,
        // 根边距，提前触发动画，移动端触发更早
        rootMargin: window.innerWidth < 768 ? '0px 0px -50px 0px' : '0px 0px -100px 0px'
    });
    
    // 观察所有带有动画类的元素
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

// 优化滚动性能
function optimizeScrollPerformance() {
    // 使用requestAnimationFrame优化滚动事件
    let ticking = false;
    
    const handleScroll = () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                // 滚动时的性能优化代码
                ticking = false;
            });
            ticking = true;
        }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
}

// 初始化页面滚动动画和性能优化
document.addEventListener('DOMContentLoaded', function() {
    initScrollAnimations();
    optimizeScrollPerformance();
});

// 图片懒加载功能
function initLazyLoad() {
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    // 立即加载社交二维码图片，因为它们默认隐藏，IntersectionObserver无法检测到
    const socialQrcodeImages = document.querySelectorAll('.social-qrcode img');
    socialQrcodeImages.forEach(image => {
        if (image.dataset.src) {
            image.src = image.dataset.src;
            image.onload = () => {
                image.classList.add('loaded');
                image.removeAttribute('data-src');
            };
            image.onerror = () => {
                image.src = 'fallback-image.jpg';
                image.classList.add('loaded');
                image.removeAttribute('data-src');
            };
        }
    });
    
    // 对于其他图片使用IntersectionObserver进行懒加载
    const otherImages = Array.from(lazyImages).filter(image => !image.closest('.social-qrcode'));
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const image = entry.target;
                    image.src = image.dataset.src;
                    
                    // 图片加载完成后添加loaded类触发淡入动画
                    image.onload = () => {
                        image.classList.add('loaded');
                        image.removeAttribute('data-src');
                    };
                    
                    // 图片加载失败处理
                    image.onerror = () => {
                        image.src = 'fallback-image.jpg';
                        image.classList.add('loaded');
                        image.removeAttribute('data-src');
                    };
                    
                    imageObserver.unobserve(image);
                }
            });
        }, {
            threshold: 0.05,
            rootMargin: '200px 0px' // 提前200px开始加载
        });
        
        otherImages.forEach(image => {
            imageObserver.observe(image);
        });
    } else {
        // 降级方案
        otherImages.forEach(image => {
            image.src = image.dataset.src;
            image.onload = () => image.classList.add('loaded');
            image.removeAttribute('data-src');
        });
    }
}

// 滚动进度指示器
function initScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        height: 3px;
        background: #ffffff;
        z-index: 9999;
        width: 0%;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', function() {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        progressBar.style.width = scrolled + '%';
    });
}

// 完整初始化所有功能（扩展版）
document.addEventListener('DOMContentLoaded', function() {
    initResponsiveNav();
    initSmoothScroll();
    initNavbarScroll();
    initPortfolioGallery();
    initContactForm();
    initScrollAnimations();
    initLazyLoad();
    initScrollProgress();
    initBackToTop();
    initParticles();
});

// 窗口调整大小时的响应式处理
window.addEventListener('resize', function() {
    const navbarMenu = document.querySelector('.navbar-menu');
    const navbarToggle = document.querySelector('.navbar-toggle');
    
    if (navbarMenu && navbarToggle) {
        if (window.innerWidth > 768) {
            navbarMenu.classList.remove('active');
            const icon = navbarToggle.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    }
});



// 粒子浮动效果
function initParticles() {
    // 只在桌面端实现粒子效果以优化移动端性能
    if (window.innerWidth < 768) return;
    
    // 创建粒子容器
    const particleContainer = document.createElement('div');
    particleContainer.className = 'particle-container';
    document.body.appendChild(particleContainer);
    
    // 创建粒子
    const particleCount = 20;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // 随机位置
        particle.style.left = `${Math.random() * 100}vw`;
        particle.style.top = `${Math.random() * 100}vh`;
        
        // 随机大小
        const size = Math.random() * 4 + 2;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        // 随机动画延迟和持续时间
        particle.style.animationDelay = `${Math.random() * 5}s`;
        particle.style.animationDuration = `${Math.random() * 10 + 10}s`;
        
        particleContainer.appendChild(particle);
    }
}

// 返回顶部按钮功能
function initBackToTop() {
    const backToTopBtn = document.createElement('button');
    backToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    backToTopBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: rgba(26, 26, 26, 0.9);
        color: #ffffff;
        border: 1px solid #333333;
        border-radius: 4px;
        cursor: pointer;
        z-index: 999;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        font-size: 18px;
    `;
    
    document.body.appendChild(backToTopBtn);
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            backToTopBtn.style.opacity = '1';
            backToTopBtn.style.visibility = 'visible';
        } else {
            backToTopBtn.style.opacity = '0';
            backToTopBtn.style.visibility = 'hidden';
        }
    });
    
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// 添加返回顶部按钮到初始化
setTimeout(() => {
    initBackToTop();
}, 1000);

// 键盘导航支持
function initKeyboardNavigation() {
    document.addEventListener('keydown', function(e) {
        // ESC键关闭菜单
        if (e.key === 'Escape') {
            const navbarMenu = document.querySelector('.navbar-menu');
            const navbarToggle = document.querySelector('.navbar-toggle');
            
            if (navbarMenu && navbarToggle && navbarMenu.classList.contains('active')) {
                navbarMenu.classList.remove('active');
                const icon = navbarToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        }
        
        // 空格键滚动页面
        if (e.key === ' ') {
            e.preventDefault();
            window.scrollBy(0, window.innerHeight * 0.8);
        }
        
        // 方向键滚动页面
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            window.scrollBy(0, 100);
        }
        
        if (e.key === 'ArrowUp') {
            e.preventDefault();
            window.scrollBy(0, -100);
        }
    });
}

// 添加键盘导航支持
document.addEventListener('DOMContentLoaded', function() {
    initKeyboardNavigation();
});

// 性能优化：防抖函数
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// 使用防抖优化滚动事件
window.addEventListener('scroll', debounce(function() {
    // 滚动时需要执行的操作
}, 100));

// 页面加载完成后添加加载完成类
document.addEventListener('DOMContentLoaded', function() {
    document.body.classList.add('page-loaded');
});

// 添加页面加载样式
document.head.insertAdjacentHTML('beforeend', `
    <style>
        body.page-loaded {
            transition: opacity 0.5s ease;
        }
    </style>
`);

// 谷歌搜索测试功能
function initGoogleSearch() {
    const searchInput = document.getElementById('google-search-input');
    const searchBtn = document.getElementById('google-search-btn');
    
    if (searchInput && searchBtn) {
        // 搜索按钮点击事件
        searchBtn.addEventListener('click', function() {
            const searchQuery = searchInput.value.trim();
            if (searchQuery) {
                // 构建谷歌搜索URL
                const googleSearchUrl = `https://www.google.com/search?q=${encodeURIComponent(searchQuery)}`;
                // 在新窗口打开谷歌搜索
                window.open(googleSearchUrl, '_blank');
            } else {
                alert('请输入搜索内容');
            }
        });
        
        // 回车键触发搜索
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                searchBtn.click();
            }
        });
    }
}

// 初始化谷歌搜索功能
document.addEventListener('DOMContentLoaded', function() {
    initGoogleSearch();
});