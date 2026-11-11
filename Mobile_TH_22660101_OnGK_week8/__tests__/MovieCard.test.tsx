import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import MovieCard, { Movie } from '../components/MovieCard';

const mockMovie: Movie = {
  id: '1',
  title: 'Test Movie',
  genre: 'Action',
  year: 2023,
  rating: 8,
  poster: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOKdjJ8dZBYG5cnek5dqt-bMCO_I8OHAOsknKZtyjFQtNA5l-fvFfXFaM&s=10',
  isShowing: true,
};

describe('MovieCard Component Tests', () => {
  // a. Test render: hiển thị đúng tên phim và điểm đánh giá đúng định dạng (vd: rating 8 -> "⭐ 8.0")
  test('renders movie title and formatted rating correctly', () => {
    const { getByText } = render(
      <MovieCard movie={mockMovie} layout="row" onSelect={() => {}} />
    );

    expect(getByText('Test Movie')).toBeTruthy();
    expect(getByText('⭐ 8.0')).toBeTruthy();
  });

  // b. Test layout: layout="row" có hiển thị thể loại; layout="tile" không hiển thị thể loại (queryByText trả về null)
  test('displays genre in row layout and hides genre in tile layout', () => {
    const { getByText, queryByText } = render(
      <>
        <MovieCard movie={mockMovie} layout="row" onSelect={() => {}} />
        <MovieCard movie={{ ...mockMovie, id: '2' }} layout="tile" onSelect={() => {}} />
      </>
    );

    // Kiểm tra layout row có hiển thị thể loại
    expect(getByText('Thể loại: Action')).toBeTruthy();

    // Kiểm tra layout tile không hiển thị thể loại (trả về null)
    expect(queryByText('Thể loại: Action')).toBeNull();
  });

  // c. Test trạng thái: isShowing: true hiển thị ✅, isShowing: false hiển thị ❌
  test('displays correct showing status (✅ or ❌)', () => {
    const { getByText: getByTextTrue, rerender } = render(
      <MovieCard movie={{ ...mockMovie, isShowing: true }} layout="row" onSelect={() => {}} />
    );
    expect(getByTextTrue('Đang chiếu ✅')).toBeTruthy();

    rerender(
      <MovieCard movie={{ ...mockMovie, isShowing: false }} layout="row" onSelect={() => {}} />
    );
    expect(getByTextTrue('Ngừng chiếu ❌')).toBeTruthy();
  });

  // d. Test sự kiện: fireEvent.press → hàm onSelect = jest.fn() được gọi đúng 1 lần với tham số là movie.id
  test('calls onSelect with movie.id when pressed', () => {
    const mockOnSelect = jest.fn();
    const { getByText } = render(
      <MovieCard movie={mockMovie} layout="row" onSelect={mockOnSelect} />
    );

    fireEvent.press(getByText('Test Movie'));

    expect(mockOnSelect).toHaveBeenCalledTimes(1);
    expect(mockOnSelect).toHaveBeenCalledWith('1');
  });
});