<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ReviewsController extends Controller
{
    // public function __construct(){
    //     $this->middleware('auth');
    //     $this->middleware('auth',['except'=>['index','show','edit','delete','store','update']]);
    // }
    public function index(Request $request)
    {
        \Log::info('reviews index');
        $user = \App\User::whereId(1)->first();
        $category=7;
        $query = $category
            ? \App\Category::whereId($category)->firstOrFail()->boards()
            : new \App\Board;

        $query = $query->where('category_id','=','7')->orderBy('id','desc');
        
        if($search = $request->input('search')) {
            \DB::statement('ALTER TABLE boards ADD FULLTEXT(title,content);');
            $raw = 'MATCH(title,content) AGAINST(? IN BOOLEAN MODE)';
            $query = $query->whereRaw($raw, [$search] );
            $query = $query->orderBy('id','desc');
        }
        if($user_id = $request->input('user_id')) {
            $query = $query->where('user_id','=', $user_id);
            $query = $query->orderBy('id','desc');
        }
        $reviews = $query->paginate(10);
        return view('reviews.index', compact('reviews'));
    }

    public function create()
    {
        \Log::info('reviews create');

        $user = \App\User::whereId(1)->first();
        \Log::info($user);

        $review = new \App\Board;

        return view('reviews.create',compact('review'));
    }

    public function store(\App\Http\Requests\ReviewsRequest $request)
    {
        \Log::info('rivews store');
        \Log::info($request->all());
        
        $review = \App\User::whereId('12')->first()->boards()->create([
            'category_id'=>$request->category_id,
            'title'=>$request->title,
            'content'=>$request->content,
        ]);
        \Log::info($review);
        $reviews = \App\Board::where('category_id','=','7')->latest()->orderBy('id','desc')->paginate(10);

        if(! $review){

            flash()->error(
                trans('review 저장 실패')
            );

            return back()->withInput();
        }
        
        return redirect()->route('reviews.index');
    }
    public function show(\App\Board $review){

        \Log::info('reviews show');
        $review->view_count += 1;
        $review->save();

        $category = $review->category_id; 
        $comments = \App\Comment::where('board_id','=',$review->id)->latest()->orderBy('id','desc')->paginate(10);

        return view('reviews.show',compact('review','category','comments'));
    }

    public function edit(\App\Board $review){

        \Log::info('reviews edit');

        return view('reviews.edit',compact('review'));
    }
    public function update(\App\Http\Requests\ReviewsRequest $request, \App\Board $review){

        \Log::info('reviews update');
        \Log::info($request->all());
        
        $review->update($request->all());
        $reviews = \App\Board::where('category_id','=','7')->latest()->orderBy('id','desc')->paginate(10);

        if(! $review){

            flash()->error(
                trans('review 업데이트 실패')
            );

            return back()->withInput();
        }

        return redirect()->route('reviews.index');
    }

    public function destroy(\App\Board $review)
    {
        \Log::info('reviews destroy');
        $review->delete();

        return redirect()->route('reviews.index');
    }
}
