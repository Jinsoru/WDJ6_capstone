{{ $user->name }}님, 환영합니다.
확인을 위해 브라우저에서 다음 4자리의 코드를 입력해주세요
<br />
{{$user->confirm_code}}
{{-- <a href = "{{ route('signup.confirm', $user->confirm_code) }}"> --}}
{{-- {{ route('signup.confirm', $user->confirm_code) }}</a> --}}