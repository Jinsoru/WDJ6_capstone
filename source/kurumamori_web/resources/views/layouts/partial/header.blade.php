<section id="main-navigation">
    <header id="header">
        <div class="header-content clearfix">
            <a class="logo" href="/">
                <image src="/icon/logo_curumamori.png" width="170px"></image>
            </a>
            <nav class="navigation" role="navigation">
                <ul class="primary-nav">
                    <li><a  href="/products">제품 d소개</a></li>
                    <li><a  href="/qna">고객 문의</a></li>
                    @if(auth()->user())
                    <li><a href="/info/index">내정보</a> </li>
                    <li><a href="/logout">로그아웃</a> </li>
                    @else
                    <li><a href="/auth/login">로그인</a> </li>

                    @endif
                </ul>
            </nav> <a href="#" class="nav-toggle">Menu<span></span></a>
        </div>
    </header>
</section>