// Dữ liệu rank gắn cứng
let ranksData = [
    {
      rankID: 1,
      rankName: "Vàng",
      iconName: "fa-star",
      iconColor: "#FFD700",
      description: "Xếp hạng cao nhất",
    },
    {
      rankID: 2,
      rankName: "Bạc",
      iconName: "fa-star",
      iconColor: "#C0C0C0",
      description: "Xếp hạng trung bình",
    },
    {
      rankID: 3,
      rankName: "Đồng",
      iconName: "fa-star",
      iconColor: "#CD7F32",
      description: "Xếp hạng cơ bản",
    },
  ];
  
  export const getRanks = async () => {
    try {
      return ranksData;
    } catch (error) {
      console.error('Error fetching ranks:', error);
      throw error;
    }
  };
  
  export const addRank = async (data) => {
    try {
      const newRank = {
        rankID: ranksData.length ? Math.max(...ranksData.map((r) => r.rankID)) + 1 : 1,
        rankName: data.rankName,
        iconName: data.iconName,
        iconColor: data.iconColor,
        description: data.description,
      };
      ranksData = [...ranksData, newRank];
      return newRank;
    } catch (error) {
      console.error('Error adding rank:', error);
      throw error;
    }
  };
  
  export const updateRank = async (data) => {
    try {
      ranksData = ranksData.map((rank) =>
        rank.rankID === data.rankID
          ? {
              rankID: data.rankID,
              rankName: data.rankName,
              iconName: data.iconName,
              iconColor: data.iconColor,
              description: data.description,
            }
          : rank
      );
      return data;
    } catch (error) {
      console.error('Error updating rank:', error);
      throw error;
    }
  };
  
  export const deleteRank = async (rankID) => {
    try {
      ranksData = ranksData.filter((rank) => rank.rankID !== rankID);
      return { success: true };
    } catch (error) {
      console.error('Error deleting rank:', error);
      throw error;
    }
  };