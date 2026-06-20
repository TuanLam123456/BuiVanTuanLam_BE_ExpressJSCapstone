-- 1. Tạo database
CREATE DATABASE `ExpressJS-Capstone`;
USE `ExpressJS-Capstone`;

-- 2. Tạo bảng nguoi_dung trước (vì các bảng khác cần tham chiếu đến nó)
CREATE table `nguoi_dung`(
	`nguoi_dung_id` INT AUTO_INCREMENT,
	`email` VARCHAR(255) NOT NULL,
	`mat_khau` VARCHAR(255) NOT NULL,
	`ho_ten` VARCHAR(255),
	`tuoi` INT,
	`anh_dai_dien` VARCHAR(255),
	PRIMARY KEY (`nguoi_dung_id`)
)

-- 3. Tạo bảng hinh_anh (tham chiếu đến nguoi_dung)
CREATE TABLE `hinh_anh` (
    `hinh_id` INT AUTO_INCREMENT,
    `ten_hinh` VARCHAR(255),
    `duong_dan` VARCHAR(255),
    `mo_ta` VARCHAR(255),
    `nguoi_dung_id` INT,
    PRIMARY KEY (`hinh_id`),
    CONSTRAINT `FK_hinhanh_nguoidung` FOREIGN KEY (`nguoi_dung_id`) 
        REFERENCES `nguoi_dung`(`nguoi_dung_id`) ON DELETE CASCADE
);

-- 4. Tạo bảng binh_luan (bảng trung gian nối nguoi_dung và hinh_anh, có PK riêng)
CREATE TABLE `binh_luan` (
    `binh_luan_id` INT AUTO_INCREMENT,
    `nguoi_dung_id` INT,
    `hinh_id` INT,
    `ngay_binh_luan` DATE,
    `noi_dung` VARCHAR(255),
    PRIMARY KEY (`binh_luan_id`),
    CONSTRAINT `FK_binhluan_nguoidung` FOREIGN KEY (`nguoi_dung_id`) 
        REFERENCES `nguoi_dung`(`nguoi_dung_id`) ON DELETE CASCADE,
    CONSTRAINT `FK_binhluan_hinhanh` FOREIGN KEY (`hinh_id`) 
        REFERENCES `hinh_anh`(`hinh_id`) ON DELETE CASCADE
);

-- 5. Tạo bảng luu_anh (bảng trung gian sử dụng Composite Key làm PK)
CREATE TABLE `luu_anh` (
    `nguoi_dung_id` INT,
    `hinh_id` INT,
    `ngay_luu` DATE,
    PRIMARY KEY (`nguoi_dung_id`, `hinh_id`),
    CONSTRAINT `FK_luuanh_nguoidung` FOREIGN KEY (`nguoi_dung_id`) 
        REFERENCES `nguoi_dung`(`nguoi_dung_id`) ON DELETE CASCADE,
    CONSTRAINT `FK_luuanh_hinhanh` FOREIGN KEY (`hinh_id`) 
        REFERENCES `hinh_anh`(`hinh_id`) ON DELETE CASCADE
);

-- 1. Chèn dữ liệu mẫu cho bảng hinh_anh (Sử dụng link hình ảnh thật từ Unsplash)
INSERT INTO `hinh_anh` (`ten_hinh`, `duong_dan`, `mo_ta`, `nguoi_dung_id`) VALUES
('Thành phố lên đèn', 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df', 'Góc phố đêm lung linh ánh đèn', 1),
('Bình minh trên biển', 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e', 'Cảnh bình minh tuyệt đẹp tại bờ biển nhiệt đới', 1),
('Rừng thông sương mù', 'https://images.unsplash.com/photo-1448375240586-882707db888b', 'Con đường đi xuyên qua rừng thông buổi sớm', 2),
('Góc làm việc tối giản', 'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5', 'Setup bàn làm việc công nghệ hiện đại', 3),
('Mèo con ngáo ngơ', 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba', 'Một chú mèo dễ thương đang nhìn ống kính', 4),
('Cốc cà phê nóng', 'https://images.unsplash.com/photo-1509042239860-f550ce710b93', 'Khởi đầu ngày mới với một ly latte art', 5),
('Kiến trúc cổ điển', 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab', 'Tòa nhà cao tầng bằng kính phản chiếu bầu trời', 6);

-- 2. Chèn dữ liệu mẫu cho bảng binh_luan (Bình luận tương tác qua lại giữa các user)
INSERT INTO `binh_luan` (`nguoi_dung_id`, `hinh_id`, `ngay_binh_luan`, `noi_dung`) VALUES
(2, 1, '2026-06-15', 'Ảnh chụp nét quá bạn ơi! Dùng máy gì thế?'),
(3, 1, '2026-06-16', 'Nhìn chill thật sự, thích góc chụp này ghê.'),
(1, 3, '2026-06-17', 'Rừng này ở Đà Lạt đúng không bạn?'),
(4, 4, '2026-06-18', 'Xin info cái bàn phím với chủ thớt ơi.'),
(5, 5, '2026-06-19', 'Mèo cưng quá, muốn nuôi một bé như này.'),
(6, 6, '2026-06-20', 'Mùi cà phê thơm nức mũi qua màn hình luôn.'),
(1, 7, '2026-06-20', 'Góc nhìn kiến trúc rất có chiều sâu.');

-- 3. Chèn dữ liệu mẫu cho bảng luu_anh (Hành động lưu ảnh/bookmark của user)
INSERT INTO `luu_anh` (`nguoi_dung_id`, `hinh_id`, `ngay_luu`) VALUES
(1, 3, '2026-06-17'),
(1, 4, '2026-06-18'),
(2, 1, '2026-06-15'),
(2, 6, '2026-06-20'),
(3, 1, '2026-06-16'),
(3, 2, '2026-06-16'),
(4, 5, '2026-06-19'),
(5, 6, '2026-06-20'),
(6, 7, '2026-06-20');