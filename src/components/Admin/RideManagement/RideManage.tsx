
import { useEffect, useState } from 'react';
import { Table, Pagination } from 'antd';
import { axiosAdmin } from '../../../service/axios/axiosAdmin';
import { toast } from 'react-toastify';
import { Rides } from '../../../interfaces/interface';

interface Passengers {
  name: string;
  phoneNumber: number; 
}

const RideManage = () => {
  const [rides, setRides] = useState<Rides[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const ridesPerPage = 5;

  useEffect(() => {
    fetchRideData();
  }, []);

  const fetchRideData = async () => {
    setLoading(true);
    try {
      const { data } = await axiosAdmin().get<Rides[]>('/getRides');
      if (data) {
        setRides(data);
      } else {
        toast.error('No Rides Found');
      }
    } catch (error) {
      toast.error((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const handleChangePage = (page: number) => {
    setCurrentPage(page);
  };

  const dataSource = rides.slice((currentPage - 1) * ridesPerPage, currentPage * ridesPerPage).map((ride) => ({
    startAddress: ride.start_address.split(',').slice(-3,-2).join(','),
    endAddress: ride.end_address.split(',').slice(-3,-2).join(','),
    rideDate: ride.rideDate.split(' ').slice(0,4).join(' '),
    rideTime: ride.rideTime,
    passengers: ride.passengers,
    numOfSeats: ride.numSeats,
    pricePerSeat: ride.pricePerSeat,
  }));

  const columns = [
    {
      title: 'Start Address',
      dataIndex: 'startAddress',
      width: '15%',
    },
    {
      title: 'End Address',
      dataIndex: 'endAddress',
      width: '15%',
    },
    {
      title: 'Ride Date',
      dataIndex: 'rideDate',
      width: '10%',
    },
    {
      title: 'Ride Time',
      dataIndex: 'rideTime',
      width: '10%',
    },
    {
      title: 'Passengers',
      dataIndex: 'passengers',
      render: (passengers: Passengers[]) => (
        <ul>
          {passengers.length ? (
            passengers.map((passenger, index) => (
              <li key={index}>
                {passenger.name} - {passenger.phoneNumber}
              </li>
            ))
          ) : (
            <li>No passengers</li>
          )}
        </ul>
      ),
      
      width: '20%',
    },
    {
      title: 'Seats',
      dataIndex: 'numOfSeats',
      width: '10%',
    },
    {
      title: 'Price/Seat',
      dataIndex: 'pricePerSeat',
      width: '10%',
    },
  ];

  return (
    <div className="ml-60 mt-16 p-8 overflow-y-auto bg-gray-200 w-[80%] min-h-[600px] mx-auto">
      {rides.length === 0 ? (
        <div>
          <h1 className="flex justify-center items-center text-grey-800 text-3xl pt-3 mt-7">
            Rides List is Empty
          </h1>
        </div>
      ) : (
        <div className="flex justify-center items-center flex-col w-full">
          <h1 className="p-2 m-2 mb-6 text-3xl text-slate-800 font-medium">Ride Management</h1>
          <Table
            dataSource={dataSource}
            columns={columns}
            loading={loading}
            pagination={false}
            bordered
            rowClassName=""
          />
          <Pagination
            current={currentPage}
            pageSize={ridesPerPage}
            total={rides.length}
            onChange={handleChangePage}
            showSizeChanger={false}
            className="mt-4"
          />
        </div>
      )}
    </div>
  );
};

export default RideManage;
