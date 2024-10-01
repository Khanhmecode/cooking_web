# Flavor Fusion

-   Flavor Fusion là blog về nấu ăn giúp mọi người học hỏi và chia sẻ
    kiến thức về ẩm thực.

# Chức năng

-   Đăng nhập, đăng ký, xác thực thông tin

-   Tạo, upload ảnh, xem bài viết

-   Upvote, Downvote

-   Bình luận

-   Follow người dùng

# Kiến trúc sản phẩm:

-   Database: Sử dụng Prisma để tạo model, chuyển đổi sang cơ sở dữ liệu
    PostgresSQL

-   Backend (NestJS) :

    -   Quản lí từng tính năng theo các module dựa theo kiến trúc của
        NestJS. Mỗi module gồm các file controller và service.

    -   Controller có nhiệm vụ xử lí những request tới server và trả về
        response cho client.

    -   Service kết nối tới database, thực hiện các thao tác liên quan
        tới truy vấn dữ liệu.

    -   Sử dụng REST API để giao tiếp với Frontend

-   Frontend (NextJS, TailwindCSS):

    -   NextJS: Tạo component, tạo route tới các page

    -   TailwindCSS: CSS giao diện
