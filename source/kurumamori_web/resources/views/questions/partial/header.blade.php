<header class="question-main-header header text-center mt-5 pt-2">
    <nav class="navbar nabar-dark">
        <h1 class="title">질문 게시판</h1>
        <button class="navbar-toggler text-white bg-danger" type="button" data-toggle="collapse" data-target="#question-navbar" aria-controls="question-navbar" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse show navbar-collapse pt-2" id="question-navbar">
            <div class="row">
                <div class="col-xs-12 col-sm-12 col-md-3">
                    <a class="card btn btn-dark text-dark"> <!-- FAQ 기능 미구현 -->
                        <div class="">
                            icon
                        </div>
                        <h1 class="">
                            FAQ
                        </h1>
                    </a>
                </div>
                <div class="col-xs-12 col-sm-12 col-md-3 ">
                    <a class="card btn btn-dark text-dark" href="{{route('questions.index')}}">
                        <div class="">
                            icon
                        </div>
                        <h1 class="">
                            전체질문
                        </h1>
                    </a>
                </div>
                <div class="col-xs-12 col-sm-12 col-md-3">
                    <a class="card btn btn-dark text-dark" href="{{route('questions.index','category_id=1')}}">
                        <div class="">
                            icon
                        </div>
                        <h1 class="">
                            공지사항
                        </h1>
                    </a>
                </div>
                <div class="col-xs-12 col-sm-12 col-md-3">
                    <a class="card btn btn-dark text-dark" href="{{route('questions.index','category_id=2')}}">
                        <div class="">
                            icon
                        </div>
                        <h1 class="">
                            업데이트
                        </h1>
                    </a>
                </div>
            </div>   
        </div>
    </nav>
</header>