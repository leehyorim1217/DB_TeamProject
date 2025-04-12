from django.shortcuts import render
from .models import Movie

def movie_list(request):
    movies = Movie.objects.all()
    total_count = movies.count()  # 전체 영화 수 계산
    return render(request, 'movies/movie_list.html', {
        'movies': movies,
        'total_count': total_count,  # 템플릿에서 사용할 변수
    })