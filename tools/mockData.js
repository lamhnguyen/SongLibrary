function createDate(days) {
  const dt = new Date();
  dt.setDate(dt.getDate() + days);
  return dt;
}

const songs = [
  {
    id: 1,
    name: "Hãy yêu như chưa yêu lần nào",
    slug: "hay-yeu-nhu-chua-yeu-lan-nao",
    genreId: 16,
    keyId: 1,
    authorIds: [3],
    poetIds: [],
    artistIds: [2, 1],
    preview:
      "1. Hỡi em [C] yêu xin em đừng [Am] buồn Có đôi [Dm] khi em hay giận [G7] hờn Để cho [C] em quên đi ngày [Am] dài Với bao [D7] đêm suy tư miệt [G7] mài. Mắt môi [C]",
    lyrics:
      "1. Hỡi em [C] yêu xin em đừng [Am] buồn\nCó đôi [Dm] khi em hay giận [G7] hờn\nĐể cho [C] em quên đi ngày [Am] dài\nVới bao [D7] đêm suy tư miệt [G7] mài.\n\nMắt môi [C] đây xin em đừng [Am] chờ\nChiếc hôn [Dm] kia mong em từng [G7] giờ\nNgón tay [C] kia xin chớ hững [Am] hờ\nDắt em [G7] đi về trong đợi [C] chờ\n\nĐK: Biết bao [Em] ngày đã [F] qua,\nBiết bao [Dm] chiều xót [G7] xa.\nNgồi [C] đếm những giọt [Am] nắng,\nRơi [Fm] rụng trước mái hiên [C] nhà.\nNgười [Bb] sao chưa đến với [F] ta,\nTình [Fm] sao chưa thấy ghé [C] qua.\nDù con [A] tim vẫn thiết [Dm] tha,\nMộng xưa [G7] cũng vơi theo tháng [C] ngày",
    views: 1532,
    likes: 135,
    createDate: createDate(-1).toJSON(),
    updateDate: null,
  },
  {
    id: 2,
    name: "Bến xuân",
    slug: "ben-xuan",
    genreId: 16,
    keyId: 10,
    authorIds: [2, 1],
    poetIds: [],
    artistIds: [3],
    preview:
      "Nhà [Em] tôi bên chiếc cầu soi [G] nước Em đến [C] tôi [Bm] một [Em] lần Bao lũ chim [Bm] rừng họp đàn trên khắp bến [Em] xuân Từng đôi rung cánh [G] trắng Ríu rít ca [D] u",
    lyrics:
      "Nhà [Em] tôi bên chiếc cầu soi [G] nước\nEm đến [C] tôi [Bm] một [Em] lần\nBao lũ chim [Bm] rừng họp đàn trên khắp bến [Em] xuân\nTừng đôi rung cánh [G] trắng\nRíu rít ca [D] u ú ù u [G] ú\nCành đào hoe [Bm] nắng chan [Em] hòa\nChim ca thương mến chim ngân [G] xa [D] u ú ù u [G] ú\nHồn mùa ngây [Bm] ngất trầm [Em] vương.\n\nDìu nhau theo dốc suối nơi ven [Em] đèo\nCòn [G] thấy chim [D] ghen lời âu [G] yếm\nĐến [B7] đây chân bước cùng ngập ngừng\nMắt em như dáng thuyền soi [D] nước\nTà [B7] áo em rung theo gió nhẹ thẹn thùng ngoài bến [Em] xuân.",
    views: 15000,
    likes: 425,
    createDate: createDate(-15).toJSON(),
    updateDate: createDate(-10).toJSON(),
  },
  {
    id: 3,
    name: "Áo anh sứt chỉ đường tà",
    slug: "ao-anh-sut-chi-duong-ta",
    genreId: 16,
    keyId: 2,
    authorIds: [1],
    poetIds: [1],
    artistIds: [4, 5],
    preview:
      "Nàng có ba người [Cm] anh đi bộ [Ab] đội lâu [Gsus4] rồi Nàng có đôi người [Fm] em có em [Bb] chưa biết [Ebmaj7] nói. [Gsus4] Tóc nàng hãy còn xanh, tóc nàng hãy còn xanh [Cm] Tôi là",
    lyrics:
      "Nàng có ba người [Cm] anh đi bộ [Ab] đội lâu [Gsus4] rồi\nNàng có đôi người [Fm] em có em [Bb] chưa biết [Ebmaj7] nói.\n\n[Gsus4] Tóc nàng hãy còn xanh, tóc nàng hãy còn xanh\n[Cm] Tôi là người chiến binh xa gia [Fm] đình đi kháng [Cm] chiến\nTôi yêu nàng như yêu người em [Bb] gái tôi [Eb] yêu\nNgười em [Fm] gái tôi [Gsus4] yêu, người em [Fm] gái tôi [Cm] yêu.\n\nNgày hợp [C] hôn tôi mặc đồ hành quân\nBùn đồng [Am] quê bết đôi giày chiến [C] sĩ\nTôi mới từ [Dm] xa nơi đơn vị [G] về\nTôi mới từ [Dm] xa nơi đơn vị [G] về.",
    views: 30000,
    likes: 1351,
    createDate: createDate(-45).toJSON(),
    updateDate: createDate(-30).toJSON(),
  },
];

const authors = [
  { id: 1, name: "Phạm Duy", slug: "pham-duy" },
  { id: 2, name: "Văn Cao", slug: "van-cao" },
  { id: 3, name: "Lê Hựu Hà", slug: "le-huu-ha" },
];

const poets = [{ id: 1, name: "Hữu Loan", slug: "huu-loan" }];

const artists = [
  { id: 1, name: "Vũ Khanh", slug: "vu-khanh" },
  { id: 2, name: "Ngọc Lan", slug: "ngoc-lan" },
  { id: 3, name: "Cao Minh", slug: "cao-minh" },
  { id: 4, name: "Elvis Phương", slug: "elvis-phuong" },
  { id: 5, name: "Thái Thanh", slug: "thai-thanh" },
];

const genres = [
  { id: 1, name: "Ballade" },
  { id: 2, name: "Blues" },
  { id: 3, name: "Boléro" },
  { id: 4, name: "Bossa Nova" },
  { id: 5, name: "Boston" },
  { id: 6, name: "Chachacha" },
  { id: 7, name: "Disco" },
  { id: 8, name: "Fox" },
  { id: 9, name: "Habanera" },
  { id: 10, name: "March" },
  { id: 11, name: "Pasodope" },
  { id: 12, name: "Pop" },
  { id: 13, name: "Rap" },
  { id: 14, name: "Rhumba" },
  { id: 15, name: "Rock" },
  { id: 16, name: "Slow" },
  { id: 17, name: "Slow Ballad" },
  { id: 18, name: "Slow Rock" },
  { id: 19, name: "Slow Surf" },
  { id: 20, name: "Tango" },
  { id: 21, name: "Twist" },
  { id: 22, name: "Valse" },
];

const keys = [
  { id: 1, name: "C" },
  { id: 2, name: "Cm" },
  { id: 3, name: "C#" },
  { id: 4, name: "C#m" },
  { id: 5, name: "D" },
  { id: 6, name: "Dm" },
  { id: 7, name: "Eb" },
  { id: 8, name: "Ebm" },
  { id: 9, name: "E" },
  { id: 10, name: "Em" },
  { id: 11, name: "F" },
  { id: 12, name: "Fm" },
  { id: 13, name: "F#" },
  { id: 14, name: "F#m" },
  { id: 15, name: "G" },
  { id: 16, name: "Gm" },
  { id: 17, name: "Ab" },
  { id: 18, name: "Abm" },
  { id: 19, name: "A" },
  { id: 20, name: "Am" },
  { id: 21, name: "Bb" },
  { id: 22, name: "Bbm" },
  { id: 23, name: "B" },
  { id: 24, name: "Bm" },
];

const newSong = {
  id: null,
  name: "",
  authorIds: [],
  poetIds: [],
  genreId: null,
  keyId: null,
  preview: "",
  lyrics: "",
};

const logs = [
  { id: 1, logLevel: 1, data: "Something wrong :(" },
  { id: 2, logLevel: 2, data: "Just for your information" },
];

const users = [
  {
    id: 1,
    authId: "google-oauth2|106171119075307882897",
    name: "Lam Nguyen",
    email: "lam.h.n@gmail.com",
    roles: "",
    token: "",
  },
];

const likes = [
  { id: 1, userId: 1, songId: 1 },
  { id: 2, userId: 1, songId: 2 },
];

// Using CommonJS style export so we can consume via Node (without using Babel-node)
module.exports = {
  newSong,
  songs,
  authors,
  poets,
  artists,
  genres,
  keys,
  logs,
  users,
  likes,
};
